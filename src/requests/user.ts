import gql from 'graphql-tag';

import { MutationHookOptions, QueryHookOptions, LazyQueryHookOptions } from '@apollo/react-hooks';
import { useLocalMutation, useLocalQuery, useLocalLazyQuery } from 'hooks/apollo';

import { User, WC2023 } from './types';

export const updateUserMutation = gql`
  mutation User(
    $idSUser: String
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
    $staps: Boolean
    $desengagement: Boolean
  ) {
    updateUser(
      idSUser: $idSUser
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
      staps: $staps
      desengagement: $desengagement
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
      wc2023Affectation {
        desengagement
        staps
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
  idSUser?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
  firstName?: string;
  lastName?: string;
  location?: string;
  logo?: string;
  codeGroupe?: string;
  wc2023?: WC2023;
  staps?: boolean;
  desengagement?: boolean;
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
          comment
          quality
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
  query GetData($isCampus: Boolean) {
    getData(isCampus: $isCampus) {
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

export const updateWc2023SpecialiteMutation = gql`
  mutation UpdateWc2023Specialite($user: ID!, $specialite: String!) {
    updateWc2023Specialite(user: $user, specialite: $specialite) {
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
  }
`;

interface UpdateWc2023SpecialiteMutationParams {
  user: string;
  specialite: string;
}

export const useUpdateWc2023Specialite = (
  options?: MutationHookOptions<{ updateWc2023Specialite: any }, UpdateWc2023SpecialiteMutationParams>,
) => useLocalMutation(updateWc2023SpecialiteMutation, options);

export const GeneratePdf = gql`
  query GeneratePdf($idUser: ID) {
    generatePdf(idUser: $idUser)
  }
`;
interface GeneratePdfParams {
  user: any;
}
export const useGeneratePdf = (options: LazyQueryHookOptions<{ generatePdf: User }, GeneratePdfParams> = {}) =>
  useLocalLazyQuery(GeneratePdf, options);
