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
    $coordinates: coordinateLocationInput
    $validateCampus: Boolean
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
      coordinates: $coordinates
      validateCampus: $validateCampus
    ) {
      user {
        id
        email
        role
        profile {
          firstName
          lastName
          institution
        }
        codeGroupe
        location
        logo
        isCampus
        validateCampus
        coordinates {
          longitude
          lattitude
        }
        wc2023 {
          formation
          degree
          perimeter
          birthdate
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
  mutation Login($email: String!, $password: String!, $isCampus: Boolean) {
    login(email: $email, password: $password, isCampus: $isCampus) {
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
        wc2023 {
          degree
          formation
          perimeter
          birthdate
          comment
          quality
        }
        wc2023Affectation {
          status
          specialite
          advisorDecision
          advisorSelection {
            expectations {
              name
            }
            club_code
            name
            city
            referrer {
              firstName
              lastName
              email
            }
            fnv1a32_hash
            licensed_text
            geolocation {
              lat
              lng
            }
            licensed_count
          }
          recommendation {
            club {
              name
              fnv1a32_hash
              referrer {
                firstName
                lastName
                email
              }
            }
            clubEmail
            token
            status
          }
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

export const forgotMutation = gql`
  mutation Forgot($email: String!) {
    forgot(email: $email)
  }
`;

export interface ForgotArguments {
  email: string;
}
export interface ForgotData {
  user: User;
}

export const useForgot = (options: MutationHookOptions<{ forgot: ForgotData }, ForgotArguments> = {}) =>
  useLocalMutation(forgotMutation, options);

export const refreshMutation = gql`
  mutation Refresh($email: String!, $refreshToken: String!) {
    refresh(email: $email, refreshToken: $refreshToken) {
      user {
        id
        email
        logo
        location
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
        wc2023 {
          degree
          formation
          perimeter
          birthdate
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

export interface RefreshArguments {
  email: string;
  refreshToken: string;
}

export const useRefresh = (options: MutationHookOptions<LoginData, RefreshArguments> = {}) =>
  useLocalMutation<LoginData, RefreshArguments>(refreshMutation, options);

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

export const resetMutation = gql`
  mutation Reset($password: String!, $token: String!) {
    reset(password: $password, token: $token) {
      user {
        id
        email
        logo
        location
        role
        profile {
          firstName
          lastName
          institution
        }
        coordinates {
          longitude
          lattitude
        }
        isCampus
        validateCampus
        codeGroupe
        wc2023 {
          degree
          formation
          perimeter
          birthdate
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

export interface ResetArguments {
  password: string;
  token: string;
}
export interface ResetData {
  user: User;
  token: Token;
}

export const useReset = (options: MutationHookOptions<{ reset: ResetData }, ResetArguments> = {}) =>
  useLocalMutation(resetMutation, options);

export const logoutMutation = gql`
  mutation {
    logout
  }
`;

export const useLogout = (options?: MutationHookOptions<{ logout: string }>) =>
  useLocalMutation(logoutMutation, options);
