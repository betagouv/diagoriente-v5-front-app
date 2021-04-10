import gql from 'graphql-tag';

import { MutationHookOptions } from '@apollo/react-hooks';
import { useLocalMutation } from 'hooks/apollo';
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
