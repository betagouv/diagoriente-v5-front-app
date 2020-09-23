import React, { useEffect, useMemo, useState } from 'react';
import { MutationTuple, QueryTuple, QueryOptions } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-boost';
import { QueryResult } from '@apollo/react-common';
import {
 Route, matchPath, RouteComponentProps, match as Match, Link, Switch,
} from 'react-router-dom';
import path from 'path';
import { decodeUri, encodeUri } from 'utils/url';
import { graphQLResult } from 'utils/graphql';

import { useError } from 'hooks/apollo';

import Loader from '@material-ui/core/CircularProgress/CircularProgress';
import Button from '@material-ui/core/Button/Button';
import Table, { Header, useActionsHeader } from 'components/ui/Table/Table';
import DefaultFilter from 'components/filters/DefaultFilter/DefaultFilter';
import Snackbar from 'components/SnackBar/SnackBar';
import Popup from 'components/common/Popup/Popup';
import KeyboardBack from '@material-ui/icons/KeyboardBackspace';

import classNames from 'utils/classNames';
import { isEmpty } from 'lodash';
import useStyle from './styles';

export const PER_PAGE = 10;

type MutationParams<T> = T extends MutationTuple<any, infer R> ? R : never;
type LazyQueryReturnType<T> = T extends QueryTuple<infer R, any> ? R : never;

interface Props<
  K extends string,
  T extends { id: string },
  L extends { page?: number; perPage?: number },
  C extends MutationTuple<any, any>,
  U extends MutationTuple<any, { id: string } & Partial<MutationParams<C>>>,
  G extends (options: QueryOptions<any, { id: string }>) => QueryTuple<any, { id: string }>,
  P extends {
    error?: ApolloError;
    onSubmit: (values: MutationParams<C>) => void;
    fetching?: boolean;
  } & Partial<LazyQueryReturnType<G>>
> extends RouteComponentProps {
  list: (
    options?: any,
  ) => QueryResult<{ [key in K]: { data: T[]; perPage: number; page: number; totalPages: number; count: number } }, L>;
  handleUri: (uri: Record<string, string>) => L;
  create?: C;
  update?: U;
  delete?: MutationTuple<any, { id?: string; ids?: string[] }>;
  get?: G;
  Form?: React.ComponentType<P>;
  formProps: {
    create: Exclude<P, 'onSubmit' | 'errors' | 'submitText' | 'fetching' | keyof LazyQueryReturnType<G>>;
    update: Exclude<P, 'onSubmit' | 'errors' | 'submitText' | 'fetching' | keyof LazyQueryReturnType<G>>;
  };
  Filter: React.ComponentType<{ onChange: (d: Omit<L, 'perPage' | 'page'>) => void }>;
  headers: Header<T>[];
  title: string;
  formTitles: { create?: string; update?: string };
}

const Crud = <
  K extends string,
  T extends { id: string },
  L extends { page?: number; perPage?: number },
  C extends MutationTuple<any, any>,
  U extends MutationTuple<any, { id: string } & Partial<MutationParams<C>>>,
  G extends (options: QueryOptions<any, { id: string }>) => QueryTuple<any, { id: string }>,
  P extends {
    error?: ApolloError;
    onSubmit: (values: MutationParams<C>) => void;
    fetching?: boolean;
  } & Partial<LazyQueryReturnType<G>>
>({
  list: useList,
  create,
  update,
  delete: remove,
  get: useGet,
  headers,
  Form,
  Filter,
  formProps,
  title,
  location,
  match,
  history,
  handleUri,
  formTitles,
}: Props<K, T, L, C, U, G, P>) => {
  const classes = useStyle();

  const mutationPlaceholder = <T, V>(): MutationTuple<T, V> => [() => {}, {}] as any;
  const getQueryPlaceholder = <T, V>(): QueryTuple<T, V> => [() => {}, {}] as any;
  /* ----- List current params extract ----- */
  const uri = decodeUri(location.search);

  /* ----- Requests handlers ----- */
  const list = useList({ variables: { perPage: PER_PAGE, ...(handleUri(uri) as any), page: Number(uri.page) || 1 } });

  // eslint-disable-next-line
  const [getCall, getState] = useGet ? useGet({ fetchPolicy: 'network-only' } as any) : getQueryPlaceholder();
  const [createCall, createState] = create || mutationPlaceholder();
  const [updateCall, updateState] = update || mutationPlaceholder();
  const [deleteCall, deleteState] = remove || mutationPlaceholder();
  const [error, setError] = useState('');

  const {
 data, page: currentPage, totalPages, count,
} = useMemo(
    () =>
      (list.data
        ? graphQLResult(list.data)
        : {
            data: [] as T[],
            page: 1,
            totalPages: 0,
            count: 0,
          }),
    [list.data],
  );
  const fetching = list.loading || createState.loading || updateState.loading || deleteState.loading;

  /* ----- Table config ----- */

  const options: {
    onEdit?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: T, index: number) => void;
    onDelete?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: T, index: number) => void;
    onMultipleDelete?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, ids: string[]) => void;
  } = {};

  if (remove) {
    options.onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: T) => {
      history.replace({ pathname: path.join(match.url, `/delete/${row.id}`), search: location.search });
    };
    options.onMultipleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, ids: string[]) => {
      history.replace({ pathname: path.join(match.url, `/delete/${ids.join(',')}`), search: location.search });
    };
  }

  if (update) {
    options.onEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: T) => {
      history.replace({ pathname: path.join(match.url, `/update/${row.id}`), search: location.search });
    };
  }

  let [improvedHeaders] = useActionsHeader(headers, data, options);

  if (!(update || remove)) {
    improvedHeaders = headers;
  }

  /* ----- Modal open checks ----- */
  const isCreate = matchPath(location.pathname, {
    path: `${match.path}/create`,
    exact: true,
  });
  const isUpdate: Match<{ id: string }> | null = matchPath(location.pathname, {
    path: `${match.path}/update/:id`,
    exact: true,
  });

  const isDelete: Match<{ id: string }> | null = matchPath(location.pathname, {
    path: `${match.path}/delete/:id`,
    exact: true,
  });

  useEffect(() => {
    if (updateState.data && !updateState.loading && !updateState.error) {
      list.refetch();
      const { page, ...rest } = uri;
      let search = '';
      if (!isEmpty(rest)) search = encodeUri(rest);

      history.replace({ pathname: match.url, search });
    }
    // eslint-disable-next-line
  }, [updateState.data, updateState.loading]);

  useEffect(() => {
    if (createState.data && !createState.loading && !createState.error) {
      if (list.data) {
        list.refetch();
      }
      history.replace(match.url);
    }
    // eslint-disable-next-line
  }, [createState.data, createState.loading]);

  useEffect(() => {
    if (deleteState.data && !deleteState.loading && !deleteState.error) {
      if (list.data) {
        list.refetch();
      }

      history.replace(match.url);
    }
    // eslint-disable-next-line
  }, [deleteState.data, deleteState.loading]);

  useEffect(() => {
    if (isUpdate) {
      getCall({ variables: { id: isUpdate.params.id } });
    }
    // eslint-disable-next-line
  }, [!!isUpdate]);

  useError(list, (e) => {
    setError(e);
  });

  useError(getState, (e) => {
    setError(e);
  });

  useError(createState, (e) => {
    setError(e);
  });

  useError(updateState, (e) => {
    setError(e);
  });

  useError(deleteState, (e) => {
    setError(e);
  });

  /* ----- Open modals functions ----- */

  function closeModal() {
    history.replace(match.url);
  }

  /* ----- Submit create or edit ----- */
  function onSubmit(values: MutationParams<C>) {
    if (isCreate) {
      createCall({ variables: values });
    } else if (isUpdate) {
      updateCall({ variables: { id: isUpdate.params.id, ...values } });
    }
  }

  function onPageChange(nextPage: number) {
    history.replace({ pathname: location.pathname, search: encodeUri({ ...uri, page: nextPage }) });
  }

  return (
    <div className={classes.container}>
      <Switch>
        <Route
          path={[match.path, path.join(match.path, '/delete/:id')]}
          exact
          render={() => (
            <div className={classes.container}>
              {fetching && (
                <div className={classes.loader}>
                  <Loader />
                </div>
              )}

              <div className={classes.titleContainer}>
                <div className={classes.title}>{title.toUpperCase()}</div>
                {create && (
                  <Link replace to={{ pathname: path.join(match.path, '/create'), search: location.search }}>
                    <Button variant="contained" color="primary">
                      Ajouter
                    </Button>
                  </Link>
                )}
              </div>

              <Filter onChange={(d) => history.replace({ pathname: location.pathname, search: encodeUri(d as any) })} />

              <Table
                currentPage={currentPage}
                onPageChange={onPageChange}
                totalPages={totalPages}
                headers={improvedHeaders}
                data={data}
                count={count}
              />
              <Popup open={!!isDelete} handleClose={closeModal}>
                <div className={classes.popupContainer}>
                  <p className={classes.popupDescription}>
                    Êtes-vous sûr ?
                    <br />
                    Souhaitez-vous vraiment supprimer
                    {' '}
                    {isDelete && isDelete.params.id.split(',').length > 1 ? 'ces documents' : 'ce document'}
                    {' '}
                    ?
                    <br />
                    Ce processus est irréversible !
                  </p>
                  <Button
                    className={classes.incluse}
                    onClick={() => {
                      const ids = isDelete?.params.id.split(',') || [];
                      if (ids.length === 1) deleteCall({ variables: { id: ids[0] } });
                      else deleteCall({ variables: { ids } });
                    }}
                  >
                    Oui, supprimer
                  </Button>
                  <Link className={classes.link} replace to={{ pathname: match.path, search: location.search }}>
                    Annuler
                  </Link>
                </div>
              </Popup>
            </div>
          )}
        />

        {Form && (
          <Route
            render={() => (
              <div className={classes.container}>
                <div className={classes.titleContainer}>
                  <Link
                    to={{ pathname: match.path, search: location.search }}
                    className={classNames(classes.arrowContainer, classes.arrowContainerWidth)}
                  >
                    <KeyboardBack className={classes.arrow} />
                    Retour à la list
                  </Link>
                  <div className={classNames(classes.title, classes.modalTitle)}>
                    {formTitles.create || `Ajouter un ${title}`}
                  </div>
                  <div className={classes.arrowContainerWidth} />
                </div>
                <Form
                  {...formProps.create}
                  title={`Ajouter ${title}`}
                  fetching={createState.loading}
                  error={createState.error}
                  onSubmit={onSubmit}
                />
              </div>
            )}
            exact
            path={path.join(match.path, '/create')}
          />
        )}
        <Route
          exact
          path={path.join(match.path, '/update/:id')}
          render={() => (
            <div className={classes.container}>
              <div className={classes.titleContainer}>
                <Link
                  to={{ pathname: match.path, search: location.search }}
                  className={classNames(classes.arrowContainer, classes.arrowContainerWidth)}
                >
                  <KeyboardBack className={classes.arrow} />
                  Retour à la list
                </Link>
                <div className={classNames(classes.title, classes.modalTitle)}>
                  {formTitles.update || `Modifier un ${title}`}
                </div>
                <div className={classes.arrowContainerWidth} />
              </div>
              {Form && getState.data && (
                <Form
                  {...formProps.update}
                  {...getState.data}
                  title={`Modifier ${title}`}
                  fetching={updateState.loading}
                  error={updateState.error}
                  onSubmit={onSubmit}
                />
              )}
            </div>
          )}
        />
      </Switch>
      <Snackbar variant="error" open={Boolean(error)} message={error} handleClose={() => setError('')} />
    </div>
  );
};

Crud.defaultProps = {
  formProps: { create: {}, update: {} },
  handleUri: (data: Record<string, string>) => data,
  Filter: DefaultFilter,
  formTitles: {},
};

export default Crud;
