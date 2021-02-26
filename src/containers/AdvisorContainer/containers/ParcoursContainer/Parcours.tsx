import React, { useState, useEffect, useContext, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  FormControl,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
  Box,
  DialogContent,
} from '@material-ui/core';
import Select from 'containers/JobsContainer/components/Select/Select';
import AutoComplete from 'containers/JobsContainer/components/Autocomplete/AutoCompleteJob';
import Tooltip from '@material-ui/core/Tooltip';
import userContext from 'contexts/UserContext';
import { MyGroupInfoQuery, useMyGroup } from 'requests/groupes';
import { useRegionContextQuery } from 'requests/regionContext';
import { useDidMount } from 'hooks/useLifeCycle';
import Table, { Header } from 'components/ui/Table/Table';
import useOnclickOutside from 'hooks/useOnclickOutside';
import Button from '@material-ui/core/Button/Button';
import { useGetUserParcour } from 'requests/parcours';
import CardContainer from 'containers/ProfilContainer/containers/CardContainer';
import ModalContainer from 'components/common/Modal/ModalContainer';
import carte from 'assets/svg/carte.svg';
import recoIcon from 'assets/svg/pmedaille.svg';
import close from 'assets/svg/close.svg';
import { useUpdateVisualisation, useUpdateUser } from 'requests/user';
import ParcourQuality, { qualities } from 'containers/AdvisorContainer/components/ParcourQuality/ParcourQuality';
import { jsonToCSV, downloadCSV } from 'utils/csv';
import CheckBox from 'components/inputs/CheckBox/CheckBox';
import { Mail } from '@material-ui/icons';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useGetConfigCampus, useConfirmationAffectation } from '../../../../requests/campus2023';
import VerifiedIcon from '../../../AdminContainer/components/VerifiedIcon/VerifiedIcon';
import ModalAffectationPE from '../../components/ModalAffectationPE/ModalAffectationPE';
import ModalAffectationConfirmation from '../../components/ModalConfirmationAffectation/ModalConfirmationAffectation';

const useStyles = makeStyles(() => ({
  customTooltip: {
    fontSize: 16,
  },
  selectContainer: {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    marginRight: 20,
  },
  clearSelect: {
    width: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2979ff',
    color: 'white',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    marginTop: 1,
    cursor: 'pointer',
    transform: 'translateX(5px)',
    transitionTimingFunction: 'ease-in',
    transition: '0.2s',
  },
  logoClear: {
    width: 16,
    height: 16,
  },
  styleSelect: {
    border: '1px solid #424242',
  },
  containerInput: {
    display: 'flex',
    alignItems: 'center',
  },
}));
const listAccData = [
  { id: 'bac', title: 'Toutes les formations' },
  { id: 'bac+1', title: 'BAC : Chef de projet junior d’un club sportif' },
  { id: 'bac+3', title: 'BAC+3 : Administrateur d’une structure sportive' },
  { id: 'bac+5', title: 'BAC+5 : Manager d’une structure sportive' },
];
const Parcours = () => {
  const classes = useStyles();
  const { user } = useContext(userContext);
  const [loadParcours, { data, loading }] = useMyGroup({ fetchPolicy: 'network-only', variables: { perPage: 20 } });
  const [updateUserCall, updateUserState] = useUpdateUser();
  const [getRegionalContext, regionalContextState] = useRegionContextQuery();
  const [openAcc, setOpenAcc] = useState(false);
  const [isRecoByClubOnly, setIsRecoByClubOnly] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openRegion, setOpenRegion] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchRegion, setSearchRegion] = useState('');

  const [current, setCurrent] = useState(1);

  const [showAffectationPEModal, setShowAffectationPEModal] = useState(false);
  const [showAffectationConfirmationModal, setShowAffectationConfirmationModal] = useState(false);

  const [customGroup, setCustomGroup] = useState<any[]>([]);
  const [customFilterGroup, setCustomFilterGroup] = useState<any[]>([]);

  const [configCall, configState] = useGetConfigCampus({ fetchPolicy: 'network-only' });
  const [selectedDegree, setSelectedDegree] = useState<string[]>([]);

  const [getParcoursCall, getParcoursState] = useGetUserParcour();
  // const [getStructuresCall, getStructuresState] = useEligibleStructures();
  const [getUpdateVisualisation, getUpdateVisualitionState] = useUpdateVisualisation();
  const [selectedUser, setSelectedUser] = useState<{ lastName: string; firstName: string }>({
    lastName: '',
    firstName: '',
  });
  const [affectationUserId, setAffectationUserId] = useState<any>(null);
  const [affectationState, setAffectationState] = useState<any>(null);
  const [confirmationAffectationCall, confirmationAffectationState] = useConfirmationAffectation();
  const [showSendMailModal, setShowSendMailModal] = useState(false);
  const [sendMailUserInfo, setSendMailUserInfo] = useState<any>(null);
  const [sendMailCall, sendMailState] = useMutation(
    gql`
      mutation($userId: String!) {
        sendMailConfirmationAffectation(userId: $userId)
      }
    `,
    { refetchQueries: [{ query: MyGroupInfoQuery, variables: { perPage: 20 } }] },
  );

  useEffect(() => {
    if (data) {
      setCustomGroup(data.myGroup.data);
      setCustomFilterGroup(data.myGroup.data);
      setCurrent(data.myGroup.page);
    }
  }, [data, isRecoByClubOnly]);

  useDidMount(() => {
    loadParcours();
    configCall();
    getRegionalContext();
  });
  useEffect(() => {
    if (confirmationAffectationState.data) {
      loadParcours();
      configCall();
      setShowAffectationConfirmationModal(false);
      setAffectationState(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmationAffectationState.data]);
  useEffect(() => {
    if (updateUserState.data) {
      loadParcours();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUserState.data]);
  const handleOpenCompetenceCard = (idUser: string, row: any) => {
    setShowModal(true);
    getParcoursCall({ variables: { idUser } });
    getUpdateVisualisation({ variables: { userId: idUser } });
    const pro = row.profile;
    setSelectedUser(pro);
  };

  /* const handleLoadStructures = (idUser: string) => {
    getStructuresCall({ variables: { userId: idUser } });
    setShowStructures(true);
  }; */

  const handleOpenAffectationPE = (row: any) => {
    setShowAffectationPEModal(true);
    setAffectationUserId(row.id);
  };
  const handleOpenConfirmationAffectation = (row: any) => {
    setShowAffectationConfirmationModal(true);
    setAffectationState(row);
  };

  const onChangeStaps = (state: boolean, id: string) => {
    updateUserCall({ variables: { idSUser: id, staps: state } });
  };
  const onChangeDesengagement = (state: boolean, id: string) => {
    updateUserCall({ variables: { idSUser: id, desengagement: state } });
  };
  useEffect(() => {
    if (confirmationAffectationState.data) {
      setShowAffectationConfirmationModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmationAffectationState.data]);
  const exportCSV = () => {
    if (data) {
      const csv = jsonToCSV(
        customGroup.map((usr: any) => {
          const quality = qualities[usr.wc2023.quality as keyof typeof qualities];
          return {
            nom: usr.profile.lastName,
            prénom: usr.profile.firstName,
            localisation: usr.location,
            nomAdvisor: `${usr.advisor.profile.firstName} ${usr.advisor.profile.lastName}`,
            emailAdvisor: usr.advisor.email,
            'choix de la formation': usr.wc2023.formation,
            'statut de la candidature': quality ? quality.title : '',
            Commentaire: usr?.wc2023?.comment,
          };
        }),
      );

      downloadCSV(csv, 'parcours');
    }
  };
  const confirmationAffectation = (dataConfirmation: { userId: string; clubName: string }) => {
    confirmationAffectationCall({ variables: dataConfirmation });
  };
  const headers: Header<any>[] = [
    {
      title: 'Candidat',
      key: 'fullName',
      render: (value, row) => (
        <>
          <div>{`${row?.profile.lastName} ${row?.profile.firstName}`.trim()}</div>
          <Box color="text.disabled">{row?.email}</Box>
        </>
      ),
    },
    {
      title: 'Emplacement',
      key: 'location',
      dataIndex: 'location',
      render: (value, row) =>
        value ? `${value} ${row.addressCodes.postCode ? row.addressCodes.postCode : ''}` : '---',
    },
    {
      title: `Région`,
      key: 'contextRegional',
      dataIndex: 'contextRegional',
      render: (value) => value && `${value.label}`,
    },
    {
      title: 'Niveau du candidat',
      key: 'niveau',
      dataIndex: 'wc2023',
      render: (value) => value.degree || '',
    },
    {
      title: 'Formation visée',
      key: 'selectedFormation',
      dataIndex: 'wc2023',
      render: (value) => value?.formation?.substr(0, value?.formation?.indexOf(' :')) || '',
    },
    {
      title: 'Parcours',
      key: 'validated',
      dataIndex: 'validateCampus',
      render: (value) => <VerifiedIcon verified={value} />,
    },
    {
      title: 'Carte de compétences',
      key: 'competenceCard',
      dataIndex: 'id',
      render: (value, row) => (
        <span onClick={() => handleOpenCompetenceCard(value, row)} style={{ cursor: 'pointer' }}>
          <img width={32} height={32} src={carte} alt="Voir la carte de compétences" />
        </span>
      ),
    },
    {
      title: 'Statut',
      key: 'note',
      dataIndex: 'wc2023',
      render: (value, row) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ParcourQuality
              comment={value.comment}
              onDone={() => loadParcours()}
              user={row.id}
              quality={value.quality}
            />
            {value.comment && (
              <Tooltip
                classes={{
                  tooltip: classes.customTooltip,
                }}
                title={value.comment}
              >
                <img src={recoIcon} alt="medaille" style={{ width: 22, height: 'auto' }} />
              </Tooltip>
            )}
          </div>
        );
      },
    },
    {
      title: 'Périmètre',
      key: 'perimeter',
      dataIndex: 'wc2023',
      render: (value) => `${value?.perimeter} km`,
    },
  ];
  if (configState.data?.configs.statusAffectation) {
    const rowRegional = [
      {
        title: 'Désengagement',
        key: 'desengagement',
        dataIndex: 'wc2023Affectation',
        render: (value: any, row: any) => (
          <CheckBox
            color="#2979ff"
            checked={value.desengagement}
            onChange={() => onChangeDesengagement(!value.desengagement, row.id)}
          />
        ),
      },
      {
        title: 'Affectation CT',
        key: 'affectation_regional',
        dataIndex: 'wc2023Affectation',
        render: (value: any, row: any) => {
          if (value.status === 'AWAITING_CAMPUS2023') {
            return (
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => handleOpenConfirmationAffectation(row)}
              >
                En attente de confirmation
              </Button>
            );
          }
          if (value.status === 'COMPLETE') {
            return <div>{value.finalClub.name}</div>;
          }
        },
      },
      {
        title: 'Envoi mail',
        key: 'email',
        render: (value: any, row: any) => {
          if (row.wc2023Affectation.finalSendMail) return 'OK';
          return (
            row.wc2023Affectation.finalClub &&
            !row.wc2023Affectation.finalSendMail && (
              <IconButton
                onClick={() => {
                  setSendMailUserInfo(row);
                  setShowSendMailModal(true);
                }}
                color="secondary"
              >
                <Mail />
              </IconButton>
            )
          );
        },
      },
    ];
    headers.push(
      {
        title: 'Spécialité',
        key: 'specialite',
        dataIndex: 'wc2023Affectation',
        render: (value) => value?.specialite || 'Aucune',
      },

      {
        title: 'Affectation',
        key: 'affectation',
        dataIndex: 'wc2023Affectation',
        render: (value, row) => {
          if (!row.wc2023?.quality || row.wc2023?.quality === 'refused') {
            return <></>;
          }
          switch (value?.status) {
            case 'PENDING':
              return <span>En attente du retour candidat</span>;
            case 'AWAITING_ADVISOR':
              return user?.codeRegionCampus ? (
                <span>En attente de pré-affectation PE</span>
              ) : (
                <Button variant="contained" size="small" color="primary" onClick={() => handleOpenAffectationPE(row)}>
                  En attente de pré-affectation
                </Button>
              );
            case 'AWAITING_CAMPUS2023':
              return 'Pré-affecté';
            case 'COMPLETE':
              return (
                <span>
                  Terminée&nbsp;
                  <VerifiedIcon verified />
                </span>
              );
            default:
              return <>/</>;
          }
        },
      },
      {
        title: 'Staps',
        key: 'staps',
        dataIndex: 'wc2023Affectation',
        render: (value: any, row: any) => (
          <CheckBox color="#2979ff" checked={value?.staps} onChange={() => onChangeStaps(!value.staps, row.id)} />
        ),
      },
    );
    if (user?.codeRegionCampus && user.role === 'advisor') {
      headers.push(...(rowRegional as any));
    }
  }
  const dataToSend: { isRecommended?: boolean; filterFormation?: string; region?: string } = {};
  const onSelectAcc = (label?: string) => {
    if (label) {
      const array = [...selectedDegree];
      array[0] = label;
      dataToSend.filterFormation = label;
      dataToSend.isRecommended = isRecoByClubOnly;
      dataToSend.region = selectedRegion;
      if (label !== 'Toutes les formations') {
        setSelectedDegree(array);
        loadParcours({ variables: dataToSend });
        setOpenAcc(false);
      } else {
        setSelectedDegree(array);
        loadParcours({ variables: dataToSend });
        setOpenAcc(false);
      }
    }
  };
  const changeRecommended = (state: boolean) => {
    if (state) dataToSend.isRecommended = true;
    if (selectedDegree.length !== 0) {
      dataToSend.filterFormation = selectedDegree[0];
    }
    dataToSend.region = selectedRegion;

    if (state) {
      setIsRecoByClubOnly(state);
      loadParcours({ variables: dataToSend });
    } else {
      setIsRecoByClubOnly(false);
      loadParcours({ variables: dataToSend });
    }
  };
  const onSelect = (s: { label: string; value: { id: string } }) => {
    setSelectedRegion(s.value.id);
    setSearchRegion(s.label);
    setOpenRegion(false);
    loadParcours({ variables: { region: s.value.id } });
  };
  const onClearSelect = () => {
    loadParcours({ variables: { isRecommended: isRecoByClubOnly, filterFormation: selectedDegree[0] } });
    setSearchRegion('');
    setSelectedRegion('');
  };
  /* {
      title: "Structures d'accueil potentielles",
      key: 'structures',
      dataIndex: 'eligibleStructuresCountWC2023',
      render: (value, row) => (
        <Button onClick={() => handleLoadStructures(row.id)}>
          <span style={{ marginRight: 10 }}>{value}</span>
          <RemoveRedEye />
        </Button>
      ),
    }, */

  /* const getTooltipData = (competences: any[]) => (
    <Typography variant="caption">
      <ul>
        {competences.map((c: any) => (
          <li>{`${c.id.title}: Niveau ${c.minimumLevel + 1}`}</li>
        ))}
      </ul>
    </Typography>
  ); */
  const divAcc = useRef<HTMLDivElement>(null);
  useOnclickOutside(divAcc, () => setOpenAcc(false));

  const handleSendMailConfirm = () => {
    sendMailCall({ variables: { userId: sendMailUserInfo.id } });
  };

  useEffect(() => {
    setShowSendMailModal(false);
  }, [sendMailState.data]);

  return (
    <>
      {loading && <p>Chargement des données ...</p>}
      {!loading && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className={classes.containerInput}>
              <Button onClick={exportCSV} variant="contained" color="primary">
                Export
              </Button>
              <FormControl className={classes.selectContainer}>
                <Select
                  options={listAccData}
                  onSelectText={onSelectAcc}
                  name="formation"
                  placeholder="Formation"
                  value={selectedDegree}
                  open={openAcc}
                  onClick={() => setOpenAcc(!openAcc)}
                  reference={divAcc}
                  isCampusDiplome
                  isCampus
                  classNameInput={classes.styleSelect}
                  colorArrow="#2979ff"
                />
              </FormControl>
              <FormControlLabel
                className={classes.selectContainer}
                control={(
                  <Checkbox
                    checked={isRecoByClubOnly}
                    onChange={() => changeRecommended(!isRecoByClubOnly)}
                    name="isRecoByClubOnly"
                  />
                )}
                label="Recommandé par un club"
              />
              <FormControl className={classes.selectContainer}>
                <AutoComplete
                  onChange={(e) => {
                    setSearchRegion(e.target.value);
                    setOpenRegion(true);
                  }}
                  onSelectText={onSelect}
                  value={searchRegion}
                  name="location"
                  placeholder="region..."
                  options={regionalContextState.data?.regionsContext}
                  type="location"
                  open={openRegion}
                  setOpen={setOpenRegion}
                />
                {selectedRegion && (
                  <div className={classes.clearSelect}>
                    <img onClick={onClearSelect} src={close} alt="close" className={classes.logoClear} />
                  </div>
                )}
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={12}>
            {customFilterGroup && (
              <Table
                onPageChange={(e) => loadParcours({ variables: { page: e } })}
                count={data?.myGroup.count}
                data={customFilterGroup}
                totalPages={data?.myGroup.totalPages || 0}
                headers={headers}
                currentPage={current}
              />
            )}
          </Grid>
          {/*     <Grid item xs={4}>
            {showStructures && (
              <>
                {!getStructuresState.data && <p>Chargement des données ...</p>}
                {getStructuresState.data && getStructuresState.data.length <= 0 && <p>Pas de structures !</p>}
                {getStructuresState.data &&
                  getStructuresState.data.eligibleStructures.map((v: any) => (
                    <div key={v.id}>
                      <Card>
                        <CardContent>
                          <Typography color="primary">
                            <strong>{v.name}</strong>
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            {`${v.licensed_text} • ${v.city}`}
                          </Typography>
                          {v.expectations.length > 0 && (
                            <ul>
                              <strong>Besoins :</strong>
                              {v.expectations.map((e: any) => (
                                <li key={e.id}>
                                  <Tooltip title={getTooltipData(e.competences)}>
                                    <span>{e.name}</span>
                                  </Tooltip>
                                </li>
                              ))}
                            </ul>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  ))}
              </>
            )}
          </Grid> */}
        </Grid>
      )}
      {getParcoursState.data?.userParcour && (
        <ModalContainer
          open={showModal}
          handleClose={() => setShowModal(false)}
          backdropColor="#011A5E"
          colorIcon="#4D6EC5"
          size={90}
        >
          <CardContainer Userparcours={getParcoursState.data?.userParcour} infoUser={selectedUser} />
        </ModalContainer>
      )}
      {showAffectationPEModal && (
        <ModalAffectationPE userId={affectationUserId} onClose={() => setShowAffectationPEModal(false)} />
      )}
      {showAffectationConfirmationModal && (
        <ModalAffectationConfirmation
          affectation={affectationState}
          onClose={() => setShowAffectationConfirmationModal(false)}
          confirmationAffectationCall={confirmationAffectation}
          confirmationAffectationData={confirmationAffectationState}
        />
      )}
      {showSendMailModal && (
        <ModalContainer
          open={showSendMailModal}
          handleClose={() => setShowSendMailModal(false)}
          backdropColor="primary"
          colorIcon="#4D6EC5"
          title="Envoi de mail"
          size={77}
        >
          <DialogContent>
            <Typography align="center" variant="h6">
              <div>
                Confirmez-vous l&apos;envoi de 2 mails, l&apos;un au candidat, l&apos;autre au club pour les informer
                de l&apos;affectation :
              </div>
              <div>
                Candidat :
{' '}
{sendMailUserInfo?.profile.firstName}
{' '}
{sendMailUserInfo?.profile.lastName}
              </div>
              <div>
Club :
{sendMailUserInfo?.wc2023Affectation?.finalClub?.name}
              </div>
            </Typography>
            <div style={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: '1em' }}
                onClick={handleSendMailConfirm}
              >
                OUI
              </Button>
              <Button variant="contained" color="primary" onClick={() => setShowSendMailModal(false)}>
                NON
              </Button>
            </div>
          </DialogContent>
        </ModalContainer>
      )}
    </>
  );
};

export default Parcours;
