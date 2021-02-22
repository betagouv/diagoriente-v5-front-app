import React, { useState, useEffect, useContext, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControl } from '@material-ui/core';
import Select from 'containers/JobsContainer/components/Select/Select';

import Tooltip from '@material-ui/core/Tooltip';
import userContext from 'contexts/UserContext';
import { useMyGroup } from 'requests/groupes';
import { useDidMount } from 'hooks/useLifeCycle';
import Table, { Header } from 'components/ui/Table/Table';
import useOnclickOutside from 'hooks/useOnclickOutside';
import Button from '@material-ui/core/Button/Button';
import { useGetUserParcour } from 'requests/parcours';
import CardContainer from 'containers/ProfilContainer/containers/CardContainer';
import ModalContainer from 'components/common/Modal/ModalContainer';
import carte from 'assets/svg/carte.svg';
import recoIcon from 'assets/svg/pmedaille.svg';
import { useUpdateVisualisation, useUpdateUser } from 'requests/user';
import ParcourQuality, { qualities } from 'containers/AdvisorContainer/components/ParcourQuality/ParcourQuality';
import { jsonToCSV, downloadCSV } from 'utils/csv';
import CheckBox from 'components/inputs/CheckBox/CheckBox';
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
  const [loadParcours, { data, loading }] = useMyGroup({ fetchPolicy: 'network-only' });
  const [updateUserCall, updateUserState] = useUpdateUser();
  const [openAcc, setOpenAcc] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    if (data) {
      setCustomGroup(data.myGroup);
      setCustomFilterGroup(data.myGroup);
    }
  }, [data]);

  useDidMount(() => {
    loadParcours();
    configCall();
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
    console.log('state', state, 'id', id);
    updateUserCall({ variables: { idSUser: id, staps: state } });
  };
  const onChangeDesengagement = (state: boolean, id: string) => {
    console.log('state', state, 'id', id);
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
        customGroup.map((user: any) => {
          const quality = qualities[user.wc2023.quality as keyof typeof qualities];
          return {
            nom: user.profile.lastName,
            prénom: user.profile.firstName,
            localisation: user.location,
            nomAdvisor: `${user.advisor.profile.firstName} ${user.advisor.profile.lastName}`,
            emailAdvisor: user.advisor.email,
            'choix de la formation': user.wc2023.formation,
            'statut de la candidature': quality ? quality.title : '',
            Commentaire: user?.wc2023?.comment,
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
      dataIndex: 'profile',
      render: (value) => `${value?.lastName.toUpperCase()} ${value?.firstName}`.trim(),
    },
    {
      title: 'E-mail',
      key: 'email',
      dataIndex: 'email',
      render: (value) => value,
    },
    {
      title: 'Emplacement',
      key: 'location',
      dataIndex: 'location',
      render: (value, row) => `${value} ${row.addressCodes.postCode ? row.addressCodes.postCode : ''}`,
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
        title: 'Affectation_Régional',
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
            return <div>{value.finalClub}</div>;
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
              return (
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
    );
    if (user?.codeRegionCampus && user.role === 'advisor') {
      headers.push(...(rowRegional as any));
    }
  }
  const onSelectAcc = (label?: string) => {
    if (label) {
      const array = [...selectedDegree];
      array[0] = label;
      if (label !== 'Toutes les formations') {
        setSelectedDegree(array);
        const a = customGroup.filter((g) => g.wc2023.formation === label);
        setCustomFilterGroup(a);
        setOpenAcc(false);
      } else {
        setSelectedDegree(array);
        setCustomFilterGroup(customGroup);
        setOpenAcc(false);
      }
    }
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
            </div>
          </Grid>
          <Grid item xs={12}>
            {customFilterGroup && (
              <Table
                onPageChange={() => null}
                count={customFilterGroup.length}
                data={customFilterGroup}
                totalPages={0}
                headers={headers}
                currentPage={1}
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
    </>
  );
};

export default Parcours;
