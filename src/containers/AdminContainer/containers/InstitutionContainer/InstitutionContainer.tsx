import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Header } from 'components/ui/Table/Table';
import { Institution } from 'requests/types';
import Crud from 'components/ui/Crud/Crud';
import {
  useAddInstitution,
  useInstitutions,
  useLazyInstitution,
  useDeleteInstitution,
  useUpdateInstitution,
} from 'requests/institution';
import institutionForm from '../../components/InstitutionForm/InstitutionForm';

const headers: Header<Institution>[] = [
  {
    dataIndex: 'nom',
    title: 'Nom',
    key: 'nom',
  },
  {
    dataIndex: 'label',
    title: 'Address',
    key: 'label',
  },
];

const InstitutionContainer = (props: RouteComponentProps) => {
  const addInstitution = useAddInstitution();
  const deleteInstitution = useDeleteInstitution();
  const updateInstitution = useUpdateInstitution();

  return (
    <div>
      <Crud
        formTitles={{ create: 'Ajouter une institution', update: "Modifier l'institution" }}
        title="Institutions"
        list={useInstitutions}
        get={useLazyInstitution}
        create={addInstitution}
        delete={deleteInstitution}
        update={updateInstitution}
        headers={headers}
        Form={institutionForm}
        {...props}
      />
      <div />
    </div>
  );
};

export default InstitutionContainer;
