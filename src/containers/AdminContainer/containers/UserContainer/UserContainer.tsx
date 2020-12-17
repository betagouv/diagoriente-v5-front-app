import React, { useState, useRef, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Header } from 'components/ui/Table/Table';
import { User } from 'requests/types';

import Crud, { ApisRef } from 'components/ui/Crud/Crud';
import moment from 'moment';

import Button from '@material-ui/core/Button/Button';

import DefaultFilter from 'components/filters/DefaultFilter/DefaultFilter';
import UserFilter from 'components/filters/UserFilter/UserFilter';
import { downloadCSV, jsonToCSV } from 'utils/csv';
import { useGroups } from 'requests/groupes';
import { useUsers, useGetUsersData } from 'requests/user';

import VerifiedIcon from '../../components/VerifiedIcon/VerifiedIcon';
import carte from '../../../../assets/svg/carte.svg';
import ModalContainer from '../../../../components/common/Modal/ModalContainer';
import CardContainer from '../../../ProfilContainer/containers/CardContainer';
import { useGetUserParcour } from '../../../../requests/parcours';

import useStyles from './styles';

const UserContainer = (props: RouteComponentProps) => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [getParcoursCall, getParcoursState] = useGetUserParcour();
  const [useGetUsersDataCall, useGetUsersDataState] = useGetUsersData();
  const [selectedUser, setSelectedUser] = useState({ lastName: '', firstName: '' });
  const [getGroups, groupsState] = useGroups();
  const apisRef = useRef<ApisRef<User>>(null);

  // @ts-ignore
  const handleOpenCompetenceCard = (idUser, row) => {
    setShowModal(true);
    getParcoursCall({ variables: { idUser } });
    const pro = row.profile;
    setSelectedUser(pro);
  };

  useEffect(() => {
    if (groupsState.data && apisRef.current) {
      const users = apisRef.current.data;
      const csv = jsonToCSV(
        users.map((user) => {
          const group = groupsState.data?.groupes.data.find(({ code }) => user.codeGroupe === code);
          return {
            nom: user.profile.lastName,
            prénom: user.profile.firstName,
            conseiller: group
              ? `${group.advisorId.profile.lastName} ${group.advisorId.profile.lastName} ${group.advisorId.email}`
              : '',
          };
        }),
      );
      downloadCSV(csv, 'utilisateurs');
    }
  }, [groupsState.data]);

  const ExportCSV = () => {
    useGetUsersDataCall();
    /* if (apisRef.current) {
      getGroups({ variables: { codes: uniq(apisRef.current.data.map((user) => user.codeGroupe)) } });
    } */
    // useGetUsersDataCall();
  };

  const headers: Header<User>[] = [
    {
      key: 'lastName',
      dataIndex: 'profile',
      title: 'NOM',
      render: (value) => value.lastName,
    },
    {
      key: 'firstName',
      dataIndex: 'profile',
      title: 'Prénom',
      render: (value) => value.firstName,
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: 'Adresse e-mail',
    },
    {
      key: 'codeGroupe',
      dataIndex: 'codeGroupe',
      title: 'Code Groupe',
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
      key: 'complete',
      dataIndex: 'validateCampus',
      title: 'Candidature validée',
      render: (value) => <VerifiedIcon verified={value} />,
    },
    {
      key: 'degree',
      dataIndex: 'wc2023',
      title: 'Niveau de diplôme',
      render: (value) => value?.degree,
    },
    {
      key: 'formation',
      dataIndex: 'wc2023',
      title: 'Formation visée',
      render: (value) => value?.formation,
    },
    {
      key: 'age',
      dataIndex: 'wc2023',
      title: 'Âge',
      render: (value) => (value && value.birthday ? `${moment().diff(value.birthdate, 'years')} ans` : ''),
    },
    {
      key: 'perimeter',
      dataIndex: 'wc2023',
      title: 'Périmètre',
      render: (value) => (value && value.perimeter ? `${value.perimeter.toString()} km` : ''),
    },
    {
      key: 'eligibleStructures',
      // @ts-ignore
      dataIndex: 'eligibleStructuresCountWC2023',
      title: 'Nombre de structures éligibles',
      render: (value) => value?.toString(),
    },
  ];

  return (
    <>
      <Crud
        apisRef={apisRef}
        formTitles={{ create: 'Ajouter un utilisateur', update: "Modifier l'utilisateur" }}
        title="Utilisateurs"
        list={useUsers}
        headers={headers}
        handleUri={({ wc2023, ...uri }) => ({ ...uri, wc2023: wc2023 && wc2023 !== 'false' })}
        Filter={(p) => (
          <DefaultFilter {...p}>{(onChange, uri) => <UserFilter uri={uri} onChange={onChange} />}</DefaultFilter>
        )}
        {...props}
      />
      <Button onClick={ExportCSV} variant="contained" color="primary" className={classes.export}>
        Export
      </Button>
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

export default UserContainer;
