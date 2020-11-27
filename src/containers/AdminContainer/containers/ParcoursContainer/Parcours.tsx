import React, { useContext, useMemo, useState } from 'react';
import { Dialog, Grid, Card, CardContent, Typography, DialogContent, DialogTitle, Tooltip } from '@material-ui/core';
import carte from 'assets/svg/carte.svg';
import UserContext from '../../../../contexts/UserContext';
import { useMyGroup } from '../../../../requests/groupes';
import { useDidMount } from '../../../../hooks/useLifeCycle';
import Table, { Header } from '../../../../components/ui/Table/Table';
import Button from '../../../../components/button/Button';
import { StructureWC2023 } from '../../../../requests/types';
import useStyle from '../../../../components/ui/Crud/styles';
import CompetenceEchelon from '../../../../components/common/CompetenceEchelon/CompetenceEchelon';
import { useGetUserParcourByUserId } from '../../../../requests/parcours';

const Parcours = () => {
  const [loadMyGroup, { data, loading }] = useMyGroup();
  const [showModal, setShowModal] = useState(false);
  const [structures, setStructures] = useState<StructureWC2023[]>([]);
  const [loadParcoursById, { data: userParcoursData, loading: userParcoursLoading }] = useGetUserParcourByUserId();
  const myGroup = data?.myGroup;

  useDidMount(() => {
    loadMyGroup();
  });

  const globalCompetences = useMemo(
    () =>
      userParcoursData?.userParcourByUserId?.globalCompetences.filter(
        (comp: any) => comp.value > 0 && comp.type === 'default',
      ) || [],
    [userParcoursData],
  );

  const handleOpenCompetenceCard = (userId: string) => {
    loadParcoursById({ variables: { userId } });
    setShowModal(true);
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
    { title: 'Emplacement', key: 'location', dataIndex: 'location' },
    { title: 'Formation choisie', key: 'selectedFormation' },
    {
      title: 'Carte de compétences',
      dataIndex: 'id',
      key: 'competenceCard',
      render: (value) => (
        <span onClick={() => handleOpenCompetenceCard(value)} style={{ cursor: 'pointer' }}>
          <img width={32} height={32} src={carte} alt="Voir la carte de compétences" />
        </span>
      ),
    },
    {
      title: 'Parcours validé',
      key: 'validatedParcours',
      render: () => (
        <span role="img" aria-label="Validé">
          ✅
        </span>
      ),
    },
    {
      title: "Structures d'accueil potentielles",
      key: 'structures',
      dataIndex: 'eligibleStructuresWC2023',
      render: (value) => (
        <Button onClick={() => setStructures(value)}>
          <span>{`Voir les structures (${value.length})`}</span>
        </Button>
      ),
    },
  ];

  const classes = useStyle();

  return (
    <>
      <div className={classes.titleContainer}>
        <div className={classes.title}>SUIVI DES CANDIDATS</div>
      </div>

      {loading && <p>Chargement des données ...</p>}
      {!loading && (
        <Grid container spacing={3}>
          <Grid item xs={8}>
            {myGroup && (
              <Table
                onPageChange={() => null}
                count={myGroup.users.length}
                data={myGroup.users}
                totalPages={1}
                headers={headers}
                currentPage={1}
              />
            )}
          </Grid>
          <Grid item xs={4}>
            {structures.map((v) => (
              <div key={v.id} style={{ marginBottom: '1em' }}>
                <Card>
                  <CardContent>
                    <Typography color="primary">
                      <strong>{v.name}</strong>
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {`${v.licensed_text} • ${v.city}`}
                    </Typography>

                    <ul>
                      <strong>Besoins :</strong>
                      {v.expectations.map((v) => (
                        <li key={v.id}>
                          <Tooltip title="Afficher ici la description des besoins">
                            <span>{v.name}</span>
                          </Tooltip>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Grid>
        </Grid>
      )}
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Carte de compétences</DialogTitle>
        <DialogContent dividers>
          {userParcoursLoading && <p>Chargement du profil utilisateur ...</p>}
          {!userParcoursLoading && userParcoursData && (
            <div>
              {!globalCompetences.length && <p>Cet utilisateur n'a pas ajouté d'expériences !</p>}
              {globalCompetences.map((v: any) => (
                <div>
                  <strong>{v.title}</strong>
                  <CompetenceEchelon value={v.value} />
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Parcours;
