import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Header } from 'components/ui/Table/Table';
import { User } from 'requests/types';

import Crud from 'components/ui/Crud/Crud';
import moment from 'moment';

import DefaultFilter from 'components/filters/DefaultFilter/DefaultFilter';
import UserFilter from 'components/filters/UserFilter/UserFilter';

import VerifiedIcon from '../../components/VerifiedIcon/VerifiedIcon';
import { useUsers } from '../../../../requests/user';
import carte from '../../../../assets/svg/carte.svg';
import ModalContainer from '../../../../components/common/Modal/ModalContainer';
import CardContainer from '../../../ProfilContainer/containers/CardContainer';
import { useGetUserParcour } from '../../../../requests/parcours';

const UserContainer = (props: RouteComponentProps) => {
  const [showModal, setShowModal] = useState(false);
  const [getParcoursCall, getParcoursState] = useGetUserParcour();
  const [selectedUser, setSelectedUser] = useState({ lastName: '', firstName: '' });

  // @ts-ignore
  const handleOpenCompetenceCard = (idUser, row) => {
    setShowModal(true);
    getParcoursCall({ variables: { idUser } });
    const pro = row.profile;
    setSelectedUser(pro);
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
      render: (value) => (value && value.birthday ? moment().diff(value.birthdate, 'years') + ' ans' : ''),
    },
    {
      key: 'perimeter',
      dataIndex: 'wc2023',
      title: 'Périmètre',
      render: (value) => {
        return value && value.perimeter ? `${value.perimeter.toString()} km` : '';
      },
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
