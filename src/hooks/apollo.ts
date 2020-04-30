import {
 useMutation, useQuery, MutationHookOptions, QueryHookOptions,
} from '@apollo/react-hooks';
import {
 OperationVariables, MutationFunctionOptions, ExecutionResult, MutationResult,
} from '@apollo/react-common';
import { DocumentNode } from 'graphql';

export function useLocalMutation<T = any, V = OperationVariables>(
  mutation: DocumentNode,
  options: MutationHookOptions<T, V> = {},
): [(options?: MutationFunctionOptions<T, V>) => Promise<ExecutionResult<T>>, MutationResult<T>] {
  return useMutation(mutation, { onError: () => {}, ...options });
}

export function useLocalQuery<T = any, V = OperationVariables>(query: DocumentNode, options: QueryHookOptions<T, V>) {
  return useQuery(query, { onError: () => {}, ...options });
}
