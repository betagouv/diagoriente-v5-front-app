import React, { useContext, useState } from 'react';
import { Modal, Dialog, Grid, Card, CardContent, Typography } from '@material-ui/core';
import UserContext from '../../../../contexts/UserContext';
import { useMyGroup } from '../../../../requests/groupes';
import { useDidMount } from '../../../../hooks/useLifeCycle';
import Table, { Header } from '../../../../components/ui/Table/Table';
import Button from '../../../../components/button/Button';
import { StructureWC2023 } from '../../../../requests/types';

const Parcours = () => {
  const { user } = useContext(UserContext);
  const [loadParcours, { data, loading }] = useMyGroup();
  const [showModal, setShowModal] = useState(false);
  const [structures, setStructures] = useState<StructureWC2023[]>([]);
  const myGroup = data?.myGroup;

  useDidMount(() => {
    loadParcours();
  });

  const handleOpenCompetenceCard = () => {
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
      key: 'competenceCard',
      render: () => (
        <Button variant="contained" onClick={() => handleOpenCompetenceCard()}>
          Voir
        </Button>
      ),
    },
    {
      title: "Structures d'accueil potentielles",
      key: 'structures',
      dataIndex: 'eligibleStructuresWC2023',
      render: (value) => <Button onClick={() => setStructures(value)}>Voir les structures</Button>,
    },
  ];

  return (
    <>
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
              <div key={v.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{v.name}</Typography>
                    <Typography color="textSecondary">{v.licensed_text}</Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Grid>
        </Grid>
      )}
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        HELLO !!!
      </Dialog>
    </>
  );
};

export default Parcours;
