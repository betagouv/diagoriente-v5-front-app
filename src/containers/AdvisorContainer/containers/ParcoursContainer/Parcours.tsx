import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useMyGroup } from 'requests/groupes';
import { useDidMount } from 'hooks/useLifeCycle';
import Table, { Header } from 'components/ui/Table/Table';
import Button from '@material-ui/core/Button/Button';
import { useGetUserParcour } from 'requests/parcours';
import CardContainer from 'containers/ProfilContainer/containers/CardContainer';
import ModalContainer from 'components/common/Modal/ModalContainer';
import carte from 'assets/svg/carte.svg';
import { useUpdateVisualisation } from 'requests/user';
import ParcourQuality, { qualities } from 'containers/AdvisorContainer/components/ParcourQuality/ParcourQuality';
import { jsonToCSV, downloadCSV } from 'utils/csv';
// import { useEligibleStructures } from '../../../../requests/campus2023';
import VerifiedIcon from '../../../AdminContainer/components/VerifiedIcon/VerifiedIcon';

const Parcours = () => {
  const [loadParcours, { data, loading }] = useMyGroup({ fetchPolicy: 'network-only' });
  const [showModal, setShowModal] = useState(false);
  // const [showStructures, setShowStructures] = useState(false);
  const [customGroup, setCustomGroup] = useState([]);
  const [getParcoursCall, getParcoursState] = useGetUserParcour();
  // const [getStructuresCall, getStructuresState] = useEligibleStructures();
  const [getUpdateVisualisation, getUpdateVisualitionState] = useUpdateVisualisation();
  const [selectedUser, setSelectedUser] = useState<{ lastName: string; firstName: string }>({
    lastName: '',
    firstName: '',
  });

  useEffect(() => {
    if (data) {
      const a = data.myGroup.map((g: any) => g.users.map((u: any) => ({ ...u, code: g.code, advisor: g.advisorId })));
      const con = a.flat(1);
      setCustomGroup(con);
    }
  }, [data]);

  useDidMount(() => {
    loadParcours();
  });

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

  const headers: Header<any>[] = [
    {
      title: 'NOM',
      key: 'lastName',
      dataIndex: 'profile',
      render: (value) => value.lastName,
    },
    {
      title: 'Prénom',
      key: 'firstName',
      dataIndex: 'profile',
      render: (value) => value.firstName,
    },
    {
      title: 'E-mail',
      key: 'email',
      dataIndex: 'email',
      render: (value) => value,
    },
    { title: 'Emplacement', key: 'location', dataIndex: 'location' },
    {
      title: 'Nom conseiller',
      key: 'firstNameAdvisor',
      dataIndex: 'advisor',
      render: (value) => `${value.profile.firstName} ${value.profile.lastName}`,
    },
    {
      title: 'E-mail Advisor',
      key: 'emailAdvisor',
      dataIndex: 'advisor',
      render: (value) => value.email,
    },
    {
      title: 'Code',
      key: 'code',
      dataIndex: 'code',
      render: (value) => value,
    },
    {
      title: 'Formation visée',
      key: 'selectedFormation',
      dataIndex: 'wc2023',
      render: (value) => value?.formation || '',
    },
    {
      title: 'Parcours validé',
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
      render: (value, row) => (
        <ParcourQuality comment={value.comment} onDone={() => loadParcours()} user={row.id} quality={value.quality} />
      ),
    },
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
  ];

  /* const getTooltipData = (competences: any[]) => (
    <Typography variant="caption">
      <ul>
        {competences.map((c: any) => (
          <li>{`${c.id.title}: Niveau ${c.minimumLevel + 1}`}</li>
        ))}
      </ul>
    </Typography>
  ); */
  return (
    <>
      {loading && <p>Chargement des données ...</p>}
      {!loading && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button onClick={exportCSV} variant="contained" color="primary">
              Export
            </Button>
          </Grid>
          <Grid item xs={12}>
            {customGroup && (
              <Table
                onPageChange={() => null}
                count={customGroup.length}
                data={customGroup}
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
    </>
  );
};

export default Parcours;
