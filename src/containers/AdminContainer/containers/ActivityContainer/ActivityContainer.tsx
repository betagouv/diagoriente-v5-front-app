import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { formatType } from 'utils/generic';

import { Header } from 'components/ui/Table/Table';
import { Activity } from 'requests/types';
import {
 useActivities, useDeleteActivity, useAddActivity, useActivity, useUpdateActivity,
} from 'requests/activities';

import Crud from 'components/ui/Crud/Crud';
import DefaultFilter from 'components/filters/DefaultFilter/DefaultFilter';
import ThemeFilter from 'components/filters/ThemeFilter/ThemeFilter';
import ActivityForm from '../../components/ActivityForm/ActivityForm';
import VerifiedIcon from '../../components/VerifiedIcon/VerifiedIcon';

const headers: Header<Omit<Activity, 'interests' | 'options'>>[] = [
  { title: 'Titre', dataIndex: 'title', key: 'title' },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: formatType,
  },
  {
    title: 'Visible',
    dataIndex: 'verified',
    key: 'verified',
    render: (value: boolean) => <VerifiedIcon verified={value} />,
  },
];

const ActivityContainer = (props: RouteComponentProps) => {
  const addActivity = useAddActivity();
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();

  return (
    <Crud
      formTitles={{ create: 'Ajouter une activité', update: 'Modifier activité' }}
      Filter={(p) => (
        <DefaultFilter {...p}>{(onChange, uri) => <ThemeFilter uri={uri} onChange={onChange} />}</DefaultFilter>
      )}
      title="Activités"
      list={useActivities}
      get={useActivity}
      create={addActivity}
      update={updateActivity}
      delete={deleteActivity}
      headers={headers}
      Form={ActivityForm}
      {...props}
    />
  );
};

export default ActivityContainer;
