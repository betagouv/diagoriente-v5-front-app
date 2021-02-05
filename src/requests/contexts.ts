import gql from 'graphql-tag';

import { QueryHookOptions, MutationHookOptions } from '@apollo/react-hooks';
import { useLocalQuery, useLocalMutation, useLocalLazyQuery } from 'hooks/apollo';

import { Context } from './types';

export const contextsQuery = gql`
  query Contexts($search: String, $page: Int, $perPage: Int) {
    contexts(search: $search, page: $page, perPage: $perPage) {
      perPage
      page
      totalPages
      count
      data {
        id
        title
        description
      }
    }
  }
`;

export interface ContextsArguments {
  search?: string;
  page?: number;
  perPage?: number;
}

export interface ContextsResponse {
  contexts: {
    data: Context[];
    perPage: number;
    page: number;
    totalPages: number;
    count: number;
  };
}

export const useContexts = (options: QueryHookOptions<ContextsResponse, ContextsArguments> = {}) =>
  useLocalQuery<ContextsResponse, ContextsArguments>(contextsQuery, options);

export const contextQuery = gql`
  query Context($id: ID!) {
    context(id: $id) {
      id
      title
      description
      icon
    }
  }
`;

export interface ContextResponse {
  context: Context;
}

export const useContext = (options: QueryHookOptions<ContextResponse, { id: string }> = {}) =>
  useLocalLazyQuery(contextQuery, options);

export const addContextMutation = gql`
  mutation AddContext($title: String!, $description: String, $icon: Upload) {
    addContext(title: $title, description: $description, icon: $icon) {
      id
      title
      description
    }
  }
`;

export interface AddContextParams {
  title: string;
  description: string;
  icon?: File;
}

export const useAddContext = (options?: MutationHookOptions<{ addContext: Context }, AddContextParams>) =>
  useLocalMutation(addContextMutation, options);

export const updateContextMutation = gql`
  mutation UpdateContext($id: ID!, $title: String, $description: String, $icon: Upload) {
    updateContext(id: $id, title: $title, description: $description, icon: $icon) {
      id
      title
      description
    }
  }
`;

export interface UpdateContextParams extends Partial<AddContextParams> {
  id: string;
}

export const useUpdateContext = (options?: MutationHookOptions<{ updateContext: Context }, UpdateContextParams>) =>
  useLocalMutation(updateContextMutation, options);

export const deleteContextMutation = gql`
  mutation DeleteContext($id: ID, $ids: [ID]) {
    deleteContext(id: $id, ids: $ids)
  }
`;

export const useDeleteContext = (
  options?: MutationHookOptions<{ deleteContext: string }, { id?: string; ids?: string[] }>,
) => useLocalMutation(deleteContextMutation, options);
