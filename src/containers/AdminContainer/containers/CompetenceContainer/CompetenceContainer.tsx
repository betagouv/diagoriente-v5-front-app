import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Header } from 'components/ui/Table/Table';
import { Competence } from 'requests/types';
import {
  useLazyCompetences,
  useDeleteCompetence,
  useAddCompetence,
  useCompetence,
  useUpdateCompetence,
} from 'requests/competences';

import Crud from 'components/ui/Crud/Crud';
import DefaultFilter from 'components/filters/DefaultFilter/DefaultFilter';
import ThemeFilter from 'components/filters/ThemeFilter/ThemeFilter';
import CompetenceForm from '../../components/CompetenceForm/CompetenceForm';

const headers: Header<Competence>[] = [
  { title: 'Titre', dataIndex: 'title', key: 'title' },
  {
    title: 'Rang',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (type: string) => type || 'Défaut',
  },
];

const CompetenceContainer = (props: RouteComponentProps) => {
  const addCompetence = useAddCompetence();
  const updateCompetence = useUpdateCompetence();
  const deleteCompetence = useDeleteCompetence();

  return (
    <Crud
      formTitles={{ create: 'Ajouter un competence' }}
      title="Competences"
      Filter={(p) => (
        <DefaultFilter {...p}>
          {(onChange, uri) => (
            <ThemeFilter
              uri={uri}
              options={[
                { value: 'default', label: 'Défault' },
                { value: 'engagement', label: 'Engagement' },
              ]}
              onChange={onChange}
            />
          )}
        </DefaultFilter>
      )}
      list={useLazyCompetences}
      get={useCompetence}
      create={addCompetence}
      update={updateCompetence}
      delete={deleteCompetence}
      headers={headers}
      Form={CompetenceForm}
      {...props}
    />
  );
};

export default CompetenceContainer;
