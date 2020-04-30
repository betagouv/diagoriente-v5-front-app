import gql from 'graphql-tag';

import { MutationHookOptions } from '@apollo/react-hooks';
import { useLocalMutation } from 'hooks/apollo';

import { User, Token } from './types';

export const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        firstName
        lastName
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
