import gql from 'graphql-tag';

import { QueryHookOptions } from '@apollo/react-hooks';
import { useLocalQuery } from 'hooks/apollo';

import { Activity } from './types';

export const activitiesQuery = gql`
  query Activities($search: String, $page: Int, $perPage: Int, $type: String) {
    activities(search: $search, page: $page, perPage: $perPage, type: $type) {
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

export interface ActivitiesArguments {
  search?: string;
  page?: number;
  perPage?: number;
  type?: string;
}

export interface ActivitiesResponse {
  activities: {
    data: Activity[];
    perPage: number;
    page: number;
    totalPages: number;
    count: number;
  };
}

export const useActivities = (options: QueryHookOptions<ActivitiesResponse, ActivitiesArguments> = {}) =>
  useLocalQuery<ActivitiesResponse, ActivitiesArguments>(activitiesQuery, options);
