import gql from 'graphql-tag';

import { MutationHookOptions } from '@apollo/react-hooks';
import { useLocalMutation } from 'hooks/apollo';

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
  ) {
    updateUser(
      password: $password
      oldPassword: $oldPassword
      firstName: $firstName
      lastName: $lastName
      codeGroupe: $codeGroupe
      location: $location
      logo: $logo
      email:$email
      wc2023:$wc2023
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
}

export const useUpdateUser = (options: MutationHookOptions<{ updateUser: User }, UpdateUserArguments> = {}) =>
  useLocalMutation(updateUserMutation, options);
