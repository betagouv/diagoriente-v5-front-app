import React, { useMemo, useState } from 'react';
import { graphQLResult } from 'utils/graphql';
import { QueryResult } from '@apollo/react-common';
import classNames from 'utils/classNames';

import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete/Autocomplete';
import TextField from '@material-ui/core/TextField/TextField';
import Label from '../Label/Label';

import useStyles from './styles';

interface AdminAutocompleteProps<
  ListKey extends string,
  T extends { id: string },
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined
>
  extends Omit<
    AutocompleteProps<{ value: string; label: string }, Multiple, DisableClearable, false>,
    'freeSolo' | 'options' | 'onInputChange' | 'renderInput' | 'getOptionLabel' | 'getOptionSelected'
  > {
  label?: string;
  error?: string;
  list: (
    options?: any,
  ) => QueryResult<
    { [key in ListKey]: { data: T[]; perPage: number; page: number; totalPages: number; count: number } },
    { search?: string }
  >;
  handleOptions: (data: T) => { value: string; label: string };
  variables: { [key: string]: any };
}

function AdminAutocomplete<
  ListKey extends string,
  T extends { id: string },
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined
>({
  list: useList,
  label,
  error,
  handleOptions,
  className,
  variables,
  ...rest
}: AdminAutocompleteProps<ListKey, T, Multiple, DisableClearable>) {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const list = useList({ variables: { search, ...variables } });

  const { data } = useMemo(() => (list.data ? graphQLResult(list.data) : { data: [] as T[] }), [list.data]);

  return (
    <div className={classNames(classes.fullWidth, className)}>
      <div className={classes.container}>
        {label && <Label>{label}</Label>}
        <Autocomplete
          className={classes.fullWidth}
          {...rest}
          getOptionLabel={(option) => option.label}
          getOptionSelected={(option, { value }) => option.value === value}
          onInputChange={(e, value) => setSearch(value)}
          options={data.map(handleOptions)}
          freeSolo={false}
          ChipProps={{ className: classes.chip }}
          renderInput={(props) => <TextField variant="outlined" error={!!error} {...props} />}
          classes={{ paper: classes.paper }}
        />
        {error && <span className={classes.error}>{error}</span>}
      </div>
    </div>
  );
}

AdminAutocomplete.defaultProps = {
  handleOptions: (d: any[]) => d,
  variables: {},
};

export default AdminAutocomplete;
