import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Header } from 'components/ui/Table/Table';
import { Context } from 'requests/types';
import {
 useContexts, useDeleteContext, useAddContext, useContext, useUpdateContext,
} from 'requests/contexts';

import Crud from 'components/ui/Crud/Crud';
import ContextForm from '../../components/ContextForm/ContextForm';

const headers: Header<Context>[] = [
  { title: 'Titre', dataIndex: 'title', key: 'title' },
  { title: 'Description', dataIndex: 'description', key: 'description' },
];

const ContextContainer = (props: RouteComponentProps) => {
  const addContext = useAddContext();
  const updateContext = useUpdateContext();
  const deleteContext = useDeleteContext();

  return (
    <Crud
      formTitles={{ create: 'Ajouter un context' }}
      title="Context"
      list={useContexts}
      get={useContext}
      create={addContext}
      update={updateContext}
      delete={deleteContext}
      headers={headers}
      Form={ContextForm}
      {...props}
    />
  );
};

export default ContextContainer;
