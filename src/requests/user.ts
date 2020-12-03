import gql from 'graphql-tag';

import { MutationHookOptions, QueryHookOptions } from '@apollo/react-hooks';
import { useLocalMutation, useLocalQuery } from 'hooks/apollo';

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
  query($page: Int, $perPage: Int) {
    users(page: $page, perPage: $perPage) {
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
