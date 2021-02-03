import {
  useMutation,
  useQuery,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  LazyQueryHookOptions,
} from '@apollo/react-hooks';
import {
  OperationVariables,
  MutationFunctionOptions,
  ExecutionResult,
  MutationResult,
  QueryResult,
} from '@apollo/react-common';
import { DocumentNode } from 'graphql';
import { useEffect } from 'react';

export function useLocalMutation<T = any, V = OperationVariables>(
  mutation: DocumentNode,
  options: MutationHookOptions<T, V> = {},
): [(options?: MutationFunctionOptions<T, V>) => Promise<ExecutionResult<T>>, MutationResult<T>] {
  return useMutation(mutation, { onError: () => {}, ...options });
}

export function useLocalQuery<T = any, V = OperationVariables>(query: DocumentNode, options: QueryHookOptions<T, V>) {
  return useQuery(query, { onError: () => {}, ...options });
}

export function useLocalLazyQuery<T = any, V = OperationVariables>(
  query: DocumentNode,
  options: LazyQueryHookOptions<T, V>,
) {
  return useLazyQuery(query, { onError: () => {}, ...options });
}

export function useError(state: MutationResult<any> | QueryResult<any>, callback: (error: string) => void) {
  useEffect(() => {
    if (state.error) {
      if (!state.error.graphQLErrors.length) {
        callback(state.error.message);
      } else if (typeof state.error.graphQLErrors[0].message === 'string') {
        callback(state.error.graphQLErrors[0].message);
      } else if (typeof state.error.graphQLErrors[0].message === 'object') {
        callback((state.error.graphQLErrors[0].message as any).message);
      }
    }
    // eslint-disable-next-line
  }, [state.error]);
}
