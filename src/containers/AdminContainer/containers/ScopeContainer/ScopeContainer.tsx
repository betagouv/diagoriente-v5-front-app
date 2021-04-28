import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Header } from 'components/ui/Table/Table';
import { useScopesList, useScopeQuery, useCreateScope } from 'requests/scopeLogin';
import Crud from 'components/ui/Crud/Crud';
import { Scopes } from 'requests/types';
import FormCreate from '../../components/ScopeForm/ScopeForm';

const headers: Header<Scopes>[] = [
  { title: 'Scope', dataIndex: 'name', key: 'name' },
  {
    title: 'Token',
    dataIndex: 'token',
    key: 'token',
  },
];

const ScopeContainer = (props: RouteComponentProps) => {
  const createScope = useCreateScope();
  return (
    <div>
      <Crud
        formTitles={{ create: 'Ajouter un scope' }}
        title="Scopes"
        list={useScopesList}
        get={useScopeQuery}
        create={createScope}
        headers={headers}
        Form={FormCreate}
        {...props}
      />
    </div>
  );
};

export default ScopeContainer;
