import gql from 'graphql-tag';

import { QueryHookOptions, MutationHookOptions } from '@apollo/react-hooks';
import { useLocalQuery, useLocalMutation, useLocalLazyQuery } from 'hooks/apollo';

import { Competence } from './types';

export const CompetencesQuery = gql`
  query Competences($type: String) {
    competences(type: $type) {
      data {
        id
        title
        niveau {
          title
          sub_title
        }
      }
    }
  }
`;

export interface CompetencesResponse {
  competences: {
    data: {
      id: string;
      title: string;
      niveau: {
        title: string;
        sub_title: string;
      }[];
    }[];
  };
}

export const useCompetences = (options: QueryHookOptions<CompetencesResponse> = {}) =>
  useLocalQuery<CompetencesResponse>(CompetencesQuery, options);

export const competencesQuery = gql`
  query Competences($search: String, $page: Int, $perPage: Int, $type: String) {
    competences(search: $search, page: $page, perPage: $perPage, type: $type) {
      perPage
      page
      totalPages
      count
      data {
        id
        title
        rank
        type
      }
    }
  }
`;

export interface CompetencesArguments {
  search?: string;
  page?: number;
  perPage?: number;
}

export interface CompetencesLazyResponse {
  competences: {
    data: Competence[];
    perPage: number;
    page: number;
    totalPages: number;
    count: number;
  };
}

export const useLazyCompetences = (options: QueryHookOptions<CompetencesLazyResponse, CompetencesArguments> = {}) =>
  useLocalQuery(competencesQuery, options);

export const competenceQuery = gql`
  query Competence($id: ID!) {
    competence(id: $id) {
      id
      title
      rank
      niveau {
        title
        sub_title
      }
      type
    }
  }
`;

export interface CompetenceResponse {
  competence: Competence;
}

export const useCompetence = (options: QueryHookOptions<CompetenceResponse, { id: string }> = {}) =>
  useLocalLazyQuery(competenceQuery, options);

export const addCompetenceMutation = gql`
  mutation AddCompetence($title: String!, $rank: Int!, $niveau: [niveauInput]!, $type: String) {
    addCompetence(title: $title, rank: $rank, niveau: $niveau, type: $type) {
      id
      title
      rank
      type
    }
  }
`;

export interface AddCompetenceParams {
  title: string;
  rank: number;
  type: string;
  niveau: {
    title: string;
    sub_title: string;
  };
}

export const useAddCompetence = (options?: MutationHookOptions<{ addCompetence: Competence }, AddCompetenceParams>) =>
  useLocalMutation(addCompetenceMutation, options);

export const updateCompetenceMutation = gql`
  mutation UpdateCompetence($id: ID!, $title: String, $rank: Int!, $niveau: [niveauInput], $type: String) {
    updateCompetence(id: $id, title: $title, rank: $rank, niveau: $niveau, type: $type) {
      id
      title
      rank
      type
    }
  }
`;

export interface UpdateCompetenceParams extends Partial<AddCompetenceParams> {
  id: string;
}

export const useUpdateCompetence = (
  options?: MutationHookOptions<{ updateCompetence: Competence }, UpdateCompetenceParams>,
) => useLocalMutation(updateCompetenceMutation, options);

export const deleteCompetenceMutation = gql`
  mutation DeleteCompetence($id: ID, $ids: [ID]) {
    deleteCompetence(id: $id, ids: $ids)
  }
`;

export const useDeleteCompetence = (
  options?: MutationHookOptions<{ deleteCompetence: string }, { id?: string; ids?: string[] }>,
) => useLocalMutation(deleteCompetenceMutation, options);
