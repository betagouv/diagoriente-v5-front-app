import gql from 'graphql-tag';

import { MutationHookOptions, QueryHookOptions } from '@apollo/react-hooks';
import { useLocalMutation, useLocalQuery } from 'hooks/apollo';

import { User, Token } from './types';

export const registerMutation = gql`
  mutation Register(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $logo: String!
    $location: String!
    $institution: String
    $codeGroupe: String
  ) {
    register(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      institution: $institution
      codeGroupe: $codeGroupe
      location: $location
      logo: $logo
    ) {
      user {
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
      }
    }
  }
`;
export interface RegisterArguments {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  location: string;
  logo: string;
  institution?: string;
  codeGroupe?: string;
}
export interface RegisterData {
  user: User;
  token: Token;
}
export const useRegister = (options: MutationHookOptions<{ register: RegisterData }, RegisterArguments> = {}) =>
  useLocalMutation(registerMutation, options);

export const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        logo
        profile {
          firstName
          lastName
          institution
        }
      }
      token {
        tokenType
        accessToken
        refreshToken
        expiresIn
      }
    }
  }
`;

export interface LoginArguments {
  email: string;
  password: string;
}
export interface LoginData {
  user: User;
  token: Token;
}

export const useLogin = (options: MutationHookOptions<{ login: LoginData }, LoginArguments> = {}) =>
  useLocalMutation(loginMutation, options);

export const refreshMutation = gql`
  mutation Refresh($email: String!, $refreshToken: String!) {
    refresh(email: $email, refreshToken: $refreshToken) {
      tokenType
      accessToken
      refreshToken
      expiresIn
    }
  }
`;

export interface RefreshArguments {
  email: string;
  refreshToken: string;
}

export const useRefresh = (options: MutationHookOptions<Token, RefreshArguments> = {}) =>
  useLocalMutation<Token, RefreshArguments>(loginMutation, options);

export const AvatarQuery = gql`
  {
    avatars {
      data {
        id
        url
      }
    }
  }
`;
export interface AvatarsResponse {
  avatars: {
    data: [
      {
        id: string;
        url: string;
      },
    ];
  };
}
export const useAvatars = (options: QueryHookOptions<AvatarsResponse> = {}) =>
  useLocalQuery<AvatarsResponse>(AvatarQuery, options);
