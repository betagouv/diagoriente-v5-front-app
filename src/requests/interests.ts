import gql from 'graphql-tag';

import { QueryHookOptions } from '@apollo/react-hooks';
import { useLocalQuery } from 'hooks/apollo';

import { Interests } from './types';

export const interestsQuery = gql`
  query Interests($search: String, $page: Int, $perPage: Int) {
    interests(search: $search, page: $page, perPage: $perPage) {
      perPage
      page
      totalPages
      count
      data {
        id
        nom
        rank
      }
    }
  }
`;

export interface InterestsArguments {
  search?: string;
  page?: number;
  perPage?: number;
}

export interface InterestsResponse {
  activities: {
    data: Interests[];
    perPage: number;
    page: number;
    totalPages: number;
    count: number;
  };
}

export const useInterests = (options: QueryHookOptions<InterestsResponse, InterestsArguments> = {}) =>
  useLocalQuery<InterestsResponse, InterestsArguments>(interestsQuery, options);
