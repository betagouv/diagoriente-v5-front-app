import React, { useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Header } from 'components/ui/Table/Table';
import {
 useThemes, useLazyTheme, useCreateTheme, useDeleteTheme, useUpdateTheme,
} from 'requests/themes';
import { Theme } from 'requests/types';

import Crud from 'components/ui/Crud/Crud';
import ThemeForm from 'containers/AdminContainer/components/ThemeForm/ThemeForm';
import DefaultFilter from 'components/filters/DefaultFilter/DefaultFilter';
import ThemeFilter from 'components/filters/ThemeFilter/ThemeFilter';

import Done from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';

import useStyles from './styles';

const ThemeContainer = (props: RouteComponentProps) => {
  const classes = useStyles();
  const theme = useLazyTheme();
  const createTheme = useCreateTheme();
  const deleteTheme = useDeleteTheme();
  const updateTheme = useUpdateTheme();

  const headers: Header<Theme>[] = useMemo(
    () => [
      {
        dataIndex: 'title',
        title: 'Titre',
        key: 'title',
      },
      { dataIndex: 'type', title: 'Type', key: 'type' },
      {
        dataIndex: 'verified',
        title: 'Visible',
        key: 'verified',
        render: (value: boolean) => (
          <div className={classes.iconsContainer}>
            {value ? <Done className={classes.success} /> : <Clear color="error" />}
          </div>
        ),
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
    ],
    [classes],
  );

  return (
    <Crud
      formTitles={{ create: 'Ajouter un theme' }}
      Form={ThemeForm}
      Filter={(p) => (
        <DefaultFilter {...p}>{(onChange, uri) => <ThemeFilter uri={uri} onChange={onChange} />}</DefaultFilter>
      )}
      title="Themes"
      list={useThemes}
      get={theme}
      create={createTheme}
      delete={deleteTheme}
      update={updateTheme}
      headers={headers}
      {...props}
    />
  );
};

export default ThemeContainer;
