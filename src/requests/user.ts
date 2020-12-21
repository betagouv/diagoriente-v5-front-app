import gql from 'graphql-tag';

import { MutationHookOptions, QueryHookOptions, LazyQueryHookOptions } from '@apollo/react-hooks';
import { useLocalMutation, useLocalQuery, useLocalLazyQuery } from 'hooks/apollo';

import { User, WC2023 } from './types';

export const updateUserMutation = gql`
  mutation User(
    $email: String
    $password: String
    $firstName: String
    $lastName: String
    $logo: String
    $location: String
    $codeGroupe: String
    $oldPassword: String
    $wc2023: wc2023Input
    $validateCampus: Boolean
    $coordinates: coordinateLocationInput
  ) {
    updateUser(
      password: $password
      oldPassword: $oldPassword
      firstName: $firstName
      lastName: $lastName
      codeGroupe: $codeGroupe
      location: $location
      logo: $logo
      email: $email
      wc2023: $wc2023
      validateCampus: $validateCampus
      coordinates: $coordinates
    ) {
      id
      email
      profile {
        firstName
        lastName
        institution
      }
      codeGroupe
      location
      logo
      validateCampus
      coordinates {
        longitude
        lattitude
      }
      wc2023 {
        degree
        formation
        perimeter
        birthdate
      }
      isCampus
    }
  }
`;
export interface UpdateUserArguments {
  email?: string;
  password?: string;
  oldPassword?: string;
  firstName?: string;
  lastName?: string;
  location?: string;
  logo?: string;
  codeGroupe?: string;
  wc2023?: WC2023;
  coordinates?: {
    longitude: number;
    lattitude: number;
  };
}

export const useUpdateUser = (options: MutationHookOptions<{ updateUser: User }, UpdateUserArguments> = {}) =>
  useLocalMutation(updateUserMutation, options);

export const usersQuery = gql`
  query($page: Int, $perPage: Int, $wc2023: Boolean, $search: String) {
    users(page: $page, perPage: $perPage, wc2023: $wc2023, search: $search) {
      perPage
      page
      totalPages
      count
      data {
        id
        role
        email
        codeGroupe
        isCampus
        profile {
          firstName
          lastName
        }
        wc2023 {
          birthdate
          perimeter
          degree
          formation
        }
        validateCampus
        eligibleStructuresCountWC2023
      }
    }
  }
`;

export const useUsers = (options: QueryHookOptions<any, any> = {}) => useLocalQuery<any, any>(usersQuery, options);
export const useUsersLazy = (options: QueryHookOptions<any, any> = {}) =>
  useLocalLazyQuery<any, any>(usersQuery, options);

export const updateWc2023QualityMutation = gql`
  mutation UpdateWc2023Quality($user: ID!, $quality: String!, $comment: String!) {
    updateWc2023Quality(user: $user, quality: $quality, comment: $comment)
  }
`;

interface UpdateWc2023QualityMutationParams {
  user: string;
  quality: string;
  comment: string;
}

export const useUpdateWc2023Quality = (
  options?: MutationHookOptions<{ updateWc2023Quality: string }, UpdateWc2023QualityMutationParams>,
) => useLocalMutation(updateWc2023QualityMutation, options);

export const UpdateVisualisations = gql`
  mutation UpdateVisialition($userId: ID) {
    updateVisialition(userId: $userId) {
      nbrVisualisation {
        userId
      }
    }
  }
`;
export interface UpdateVisualisationArguments {
  userId: string;
}
export const useUpdateVisualisation = (
  options: MutationHookOptions<{ updateVisialition: User }, UpdateVisualisationArguments> = {},
) => useLocalMutation(UpdateVisualisations, options);
export const GetUsersData = gql`
  {
    getData {
      id
    }
  }
`;
interface IGetDataResponse {
  getData: {
    id: string;
  };
}
export const useGetUsersData = (options: LazyQueryHookOptions<IGetDataResponse> = {}) =>
  useLocalLazyQuery(GetUsersData, options);

export const UpdateCodeGroupMutation = gql`
  mutation AffectUserCode($email: String!, $code: String!) {
    affectUserCode(email: $email, code: $code) {
      email
      codeGroupe
    }
  }
`;
interface UpdateCodeGroupMutationParams {
  email: string;
  code: string;
}
export const useAffectUserCode = (
  options: MutationHookOptions<{ affectUserCode: User }, UpdateCodeGroupMutationParams> = {},
) => useLocalMutation(UpdateCodeGroupMutation, options);
