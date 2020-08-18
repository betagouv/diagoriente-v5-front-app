import gql from 'graphql-tag';

import { QueryHookOptions, MutationHookOptions } from '@apollo/react-hooks';
import { useLocalQuery, useLocalMutation, useLocalLazyQuery } from 'hooks/apollo';

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
        verified
        type
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
    data: Omit<Activity, 'interests'>[];
    perPage: number;
    page: number;
    totalPages: number;
    count: number;
  };
}

export const useActivities = (options: QueryHookOptions<ActivitiesResponse, ActivitiesArguments> = {}) =>
  useLocalQuery<ActivitiesResponse, ActivitiesArguments>(activitiesQuery, options);

export const activityQuery = gql`
  query Activity($id: ID!) {
    activity(id: $id) {
      id
      title
      type
      description
      verified
      interests {
        id
        nom
      }
    }
  }
`;

export interface ActivityResponse {
  activity: Activity;
}

export const useActivity = (options: QueryHookOptions<ActivityResponse, { id: string }> = {}) =>
  useLocalLazyQuery(activityQuery, options);

export const addActivityMutation = gql`
  mutation AddActivity($title: String!, $description: String!, $type: String!, $verified: Boolean!, $interests: [ID]) {
    addActivity(title: $title, description: $description, type: $type, verified: $verified, interests: $interests) {
      id
      title
      description
      verified
      type
    }
  }
`;

export interface AddActivityParams {
  title: string;
  description: string;
  type: string;
  verified: boolean;
  interests?: string[];
}

export const useAddActivity = (options?: MutationHookOptions<{ addActivity: Activity }, AddActivityParams>) =>
  useLocalMutation(addActivityMutation, options);

export const updateActivityMutation = gql`
  mutation UpdateActivity(
    $id: ID!
    $title: String
    $description: String
    $type: String
    $verified: Boolean
    $interests: [ID]
  ) {
    updateActivity(
      id: $id
      title: $title
      description: $description
      type: $type
      verified: $verified
      interests: $interests
    ) {
      id
      title
      description
      verified
      type
    }
  }
`;

export interface UpdateActivityParams extends Partial<AddActivityParams> {
  id: string;
}

export const useUpdateActivity = (options?: MutationHookOptions<{ updateActivity: Activity }, UpdateActivityParams>) =>
  useLocalMutation(updateActivityMutation, options);

export const deleteActivityMutation = gql`
  mutation DeleteActivity($id: ID, $ids: [ID]) {
    deleteActivity(id: $id, ids: $ids)
  }
`;

export const useDeleteActivity = (
  options?: MutationHookOptions<{ deleteActivity: string }, { id?: string; ids?: string[] }>,
) => useLocalMutation(deleteActivityMutation, options);
