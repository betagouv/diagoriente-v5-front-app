import gql from 'graphql-tag';

import { MutationHookOptions, QueryHookOptions } from '@apollo/react-hooks';
import { useLocalMutation, useLocalQuery, useLocalLazyQuery } from 'hooks/apollo';
import { User, Token } from './types';

export const loginScopeMutation = gql`
  mutation LoginScope($scope: String!, $token: String!) {
    loginScope(scope: $scope, token: $token) {
      user {
        id
        email
        logo
        location
        codeGroupe
        role
        profile {
          firstName
          lastName
          institution
        }
        isCampus
        validateCampus
        coordinates {
          longitude
          lattitude
        }
        codeRegionCampus
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

export interface scopeLoginParams {
  token: string;
  scope: string;
}
export interface LoginScopeData {
  user: User;
  token: Token;
}

export const useLoginScope = (options?: MutationHookOptions<{ loginScope: LoginScopeData }, scopeLoginParams>) =>
  useLocalMutation(loginScopeMutation, options);

export const scopesList = gql`
  {
    scopes {
      perPage
      page
      totalPages
      count
      data {
        id
        name
        token
      }
    }
  }
`;
export interface ScopesData {
  scopes: {
    data: { id: string; name: string; token: string }[];
    perPage: number;
    page: number;
    totalPages: number;
    count: number;
  };
}
export const useScopesList = (options: QueryHookOptions) => useLocalQuery(scopesList, options);

export const scope = gql`
  query Scope($id: String!) {
    scope(id: $id) {
      id
      name
      token
    }
  }
`;
export interface ScopeData {
  scope: {
    id: string;
    name: string;
    token: string;
  };
}
export const useScopeQuery = (options: QueryHookOptions<ScopeData, { id: string }> = {}) =>
  useLocalLazyQuery(scope, options);

export const createScopeMutation = gql`
  mutation AddScope($name: String!) {
    addScope(name: $name) {
      id
      name
      token
    }
  }
`;
export interface createScopeParams {
  name: string;
}
export interface createScopeData {
  id: string;
  name: string;
  token: string;
}
export const useCreateScope = (options?: MutationHookOptions<createScopeData, createScopeParams>) =>
  useLocalMutation<createScopeData, createScopeParams>(createScopeMutation, options);
