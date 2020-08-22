import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Header } from 'components/ui/Table/Table';
import {
 useThemes, useLazyTheme, useAddTheme, useDeleteTheme, useUpdateTheme,
} from 'requests/themes';
import { Theme } from 'requests/types';

import { formatType } from 'utils/generic';

import Crud from 'components/ui/Crud/Crud';
import ThemeForm from 'containers/AdminContainer/components/ThemeForm/ThemeForm';
import DefaultFilter from 'components/filters/DefaultFilter/DefaultFilter';
import ThemeFilter from 'components/filters/ThemeFilter/ThemeFilter';
import VerifiedIcon from '../../components/VerifiedIcon/VerifiedIcon';

const headers: Header<Theme>[] = [
  {
    dataIndex: 'title',
    title: 'Titre',
    key: 'title',
  },
  {
    dataIndex: 'type',
    title: 'Type',
    key: 'type',
    render: formatType,
  },
  {
    dataIndex: 'verified',
    title: 'Visible',
    key: 'verified',
    render: (value: boolean) => <VerifiedIcon verified={value} />,
  },
  {
    dataIndex: 'description',
    key: 'description',
    title: 'Description',
  },
  {
    dataIndex: 'activities',
    key: 'activities',
    title: "Nombre d'activités",
    render: (row: any[]) => String(row ? row.length : 0),
  },
];

const ThemeContainer = (props: RouteComponentProps) => {
  const addTheme = useAddTheme();
  const deleteTheme = useDeleteTheme();
  const updateTheme = useUpdateTheme();

  return (
    <Crud
      formTitles={{ create: 'Ajouter un theme', update: 'Modifier le theme' }}
      Form={ThemeForm}
      Filter={(p) => (
        <DefaultFilter {...p}>{(onChange, uri) => <ThemeFilter uri={uri} onChange={onChange} />}</DefaultFilter>
      )}
      title="Themes"
      list={useThemes}
      get={useLazyTheme}
      create={addTheme}
      delete={deleteTheme}
      update={updateTheme}
      headers={headers}
      {...props}
    />
  );
};

export default ThemeContainer;
