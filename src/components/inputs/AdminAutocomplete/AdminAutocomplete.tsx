import React, { useMemo, useState } from 'react';
import { graphQLResult } from 'utils/graphql';
import { uniqBy } from 'lodash';
import { QueryResult } from '@apollo/react-common';
import { useDidUpdate } from 'hooks/useLifeCycle';
import classNames from 'utils/classNames';

import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete/Autocomplete';
import TextField from '@material-ui/core/TextField/TextField';
import { QueryTuple } from '@apollo/react-hooks';
import Label from '../Label/Label';

import useStyles from './styles';

interface AdminAutocompleteBaseProps<
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
  handleOptions: (data: T) => { value: string; label: string };
  variables: { [key: string]: any };
}

type AdminAutocompleteProps<
  ListKey extends string,
  T extends { id: string },
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined
> = AdminAutocompleteBaseProps<T, Multiple, DisableClearable> &
  (
    | {
        lazy?: false;
        list: (
          options?: any,
        ) => QueryResult<
          { [key in ListKey]: { data: T[]; perPage: number; page: number; totalPages: number; count: number } },
          { search?: string }
        >;
      }
    | {
        lazy: true;
        list: (
          options?: any,
        ) => QueryTuple<
          { [key in ListKey]: { data: T[]; perPage: number; page: number; totalPages: number; count: number } },
          { search?: string }
        >;
      }
  );

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
  multiple,
  value: autoCompleteValue,
  disabled,
  lazy,
  ...rest
}: AdminAutocompleteProps<ListKey, T, Multiple, DisableClearable>) {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const list = useList({ variables: { search, ...variables } });
  const listObject = lazy ? (list as any)[1] : list;

  const { data } = useMemo(() => (listObject.data ? graphQLResult(listObject.data) : { data: [] as T[] }), [
    listObject,
  ]);

  useDidUpdate(() => {
    if (lazy && search) {
      (list as any)[0]();
    }
  }, [lazy, search]);

  const options = useMemo(() => {
    let opts = data.map(handleOptions);
    if (multiple && autoCompleteValue) {
      opts = uniqBy([...opts, ...(autoCompleteValue as any)], ({ value }) => value);
    }
    return opts;
    // eslint-disable-next-line
  }, [data, multiple, autoCompleteValue]);

  return (
    <div className={classNames(classes.fullWidth, className)}>
      <div className={classes.container}>
        {label && <Label>{label}</Label>}
        <Autocomplete
          className={classes.fullWidth}
          value={autoCompleteValue}
          {...rest}
          getOptionLabel={(option) => option.label}
          getOptionSelected={(option, { value }) => option.value === value}
          onInputChange={(e, value) => setSearch(value)}
          options={options}
          freeSolo={false}
          ChipProps={{ className: classes.chip }}
          renderInput={(props) => <TextField variant="outlined" error={!!error} {...props} />}
          classes={{ paper: classes.paper }}
          multiple={multiple}
          loading={listObject.loading}
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
