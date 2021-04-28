import gql from 'graphql-tag';

import { QueryHookOptions, MutationHookOptions } from '@apollo/react-hooks';
import { useLocalQuery, useLocalMutation, useLocalLazyQuery } from 'hooks/apollo';

import { Option } from './types';

export const optionsQuery = gql`
  query Options($search: String, $page: Int, $perPage: Int, $parent: String, $question: ID) {
    options(search: $search, page: $page, perPage: $perPage, parent: $parent, question: $question) {
      perPage
      page
      totalPages
      count
      data {
        id
        title
        question {
          id
          title
        }
        parent {
          path {
            id
            title
          }
        }
        user
        verified
      }
    }
  }
`;

export interface OptionsArguments {
  search?: string;
  page?: number;
  perPage?: number;
  question?: string;
  parent?: string;
}

export interface OptionsResponse {
  options: {
    data: Option[];
    perPage: number;
    page: number;
    totalPages: number;
    count: number;
  };
}

export const useOptions = (options: QueryHookOptions<OptionsResponse, OptionsArguments> = {}) =>
  useLocalQuery<OptionsResponse, OptionsArguments>(optionsQuery, options);

export const useLazyOptions = (options: QueryHookOptions<OptionsResponse, OptionsArguments> = {}) =>
  useLocalLazyQuery<OptionsResponse, OptionsArguments>(optionsQuery, options);

export const optionQuery = gql`
  query Option($id: ID!) {
    option(id: $id) {
      id
      title
      question {
        id
        title
      }
      parent {
        path {
          id
          title
        }
      }
      user
      verified
    }
  }
`;

export interface OptionResponse {
  option: Option;
}

export const useOption = (options: QueryHookOptions<OptionResponse, { id: string }> = {}) =>
  useLocalLazyQuery(optionQuery, options);

export const addOptionMutation = gql`
  mutation AddOption($title: String!, $parent: [[ID]], $question: ID!, $verified: Boolean) {
    addOption(title: $title, parent: $parent, question: $question, verified: $verified) {
      id
      title
    }
  }
`;

export interface AddOptionParams {
  title: string;
  parent: string[][];
  question: string;
}

export const useAddOption = (options?: MutationHookOptions<{ addOption: Option }, AddOptionParams>) =>
  useLocalMutation(addOptionMutation, options);

export const updateOptionMutation = gql`
  mutation UpdateOption($id: ID!, $title: String, $parent: [[ID]], $question: ID, $verified: Boolean) {
    updateOption(id: $id, title: $title, parent: $parent, question: $question, verified: $verified) {
      id
      title
    }
  }
`;

export interface UpdateOptionParams extends Partial<AddOptionParams> {
  id: string;
}

export const useUpdateOption = (options?: MutationHookOptions<{ updateOption: Option }, UpdateOptionParams>) =>
  useLocalMutation(updateOptionMutation, options);

export const deleteOptionMutation = gql`
  mutation DeleteOption($id: ID, $ids: [ID]) {
    deleteOption(id: $id, ids: $ids)
  }
`;

export const useDeleteOption = (
  options?: MutationHookOptions<{ deleteOption: string }, { id?: string; ids?: string[] }>,
) => useLocalMutation(deleteOptionMutation, options);
