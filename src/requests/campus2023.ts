import gql from 'graphql-tag';
import { LazyQueryHookOptions, MutationHookOptions } from '@apollo/react-hooks';
import { useLocalLazyQuery, useLocalMutation } from '../hooks/apollo';
import { EligibleStructure, User } from './types';

export const EligibleStructuresQuery = gql`
  query($userId: ID) {
    eligibleStructures(userId: $userId) {
      id
      name
      licensed_text
      city
      club_code
      geolocation {
        lng
        lat
      }
      licensed_count
      referrer {
        firstName
        lastName
        email
      }
      fnv1a32_hash
      expectations {
        name
        competences {
          id {
            id
            title
          }
          minimumLevel
        }
      }
    }
  }
`;
export interface eligibleStructuresResponse {
  eligibleStructures: EligibleStructure[];
}
export const useEligibleStructures = (options: LazyQueryHookOptions<eligibleStructuresResponse> = {}) =>
  useLocalLazyQuery<eligibleStructuresResponse>(EligibleStructuresQuery, options);

export const EligibleStructuresExpectationQuery = gql`
  query {
    eligibleStructuresExpectation {
      name
    }
  }
`;
export interface eligibleStructureExpectationsResponse {
  eligibleStructuresExpectation: { name: string }[];
}

export const useEligibleStructuresExpectation = (
  options: LazyQueryHookOptions<eligibleStructureExpectationsResponse> = {},
) => useLocalLazyQuery<eligibleStructureExpectationsResponse>(EligibleStructuresExpectationQuery, options);
export const AddRecoCampusMutation = gql`
  mutation AddRecoCampus(
    $clubId: String!
    $clubEmail: String!
    $firstName: String!
    $lastName: String!
    $status: String!
  ) {
    addRecoCampus(clubId: $clubId, clubEmail: $clubEmail, firstName: $firstName, lastName: $lastName, status: $status) {
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
export interface addRecoMutationParams {
  clubId: string;
  clubEmail: string;
  firstName: string;
  lastName: string;
  status: string;
}
export interface addrecoMutationResponse {
  addRecoCampus: User;
}
export const useAddRecoStructures = (options: MutationHookOptions<addrecoMutationResponse> = {}) =>
  useLocalMutation<addrecoMutationResponse>(AddRecoCampusMutation, options);
