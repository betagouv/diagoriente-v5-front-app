import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Tooltip } from '@material-ui/core';
import { useMyGroup } from 'requests/groupes';
import { useDidMount } from 'hooks/useLifeCycle';
import Table, { Header } from 'components/ui/Table/Table';
import Button from 'components/button/Button';
import { StructureWC2023 } from 'requests/types';
import { useGetUserParcour } from 'requests/parcours';

import CardContainer from 'containers/ProfilContainer/containers/CardContainer';
import ModalContainer from 'components/common/Modal/ModalContainer';
import carte from 'assets/svg/carte.svg';
import { useEligibleStructures } from '../../../../requests/campus2023';
import VerifiedIcon from '../../../AdminContainer/components/VerifiedIcon/VerifiedIcon';

const Parcours = () => {
  const [loadParcours, { data, loading }] = useMyGroup();
  const [showModal, setShowModal] = useState(false);
  const [showStructures, setShowStructures] = useState(false);
  const [getParcoursCall, getParcoursState] = useGetUserParcour();
  const [getStructuresCall, getStructuresState] = useEligibleStructures();
  const [selectedUser, setSelectedUser] = useState<{ lastName: string; firstName: string }>({
    lastName: '',
    firstName: '',
  });
  const myGroup = data?.myGroup;

  useDidMount(() => {
    loadParcours();
  });

  const handleOpenCompetenceCard = (idUser: string, row: any) => {
    setShowModal(true);
    getParcoursCall({ variables: { idUser } });
    const pro = row.profile;
    setSelectedUser(pro);
  };

  const handleLoadStructures = (idUser: string) => {
    getStructuresCall({ variables: { userId: idUser } });
    setShowStructures(true);
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
      title: "Structures d'accueil potentielles",
      key: 'structures',
      dataIndex: 'eligibleStructuresCountWC2023',
      render: (value, row) => (
        <Button onClick={() => handleLoadStructures(row.id)}>
          <span>{`Voir les structures (${value})`}</span>
        </Button>
      ),
    },
  ];

  const getTooltipData = (competences: any[]) => (
    <Typography variant="caption">
      <ul>
        {competences.map((c: any) => (
          <li>{`${c.id.title}: Niveau ${c.minimumLevel + 1}`}</li>
        ))}
      </ul>
    </Typography>
  );

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
                totalPages={0}
                headers={headers}
                currentPage={1}
              />
            )}
          </Grid>
          <Grid item xs={4}>
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
          </Grid>
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