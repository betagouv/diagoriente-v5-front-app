import gql from 'graphql-tag';
import { LazyQueryHookOptions, MutationHookOptions } from '@apollo/react-hooks';
import { useLocalLazyQuery, useLocalMutation, useLocalQuery } from '../hooks/apollo';
import { EligibleStructure, User } from './types';

export const EligibleStructuresQuery = gql`
  query($userId: ID, $ignoreDistance: Boolean) {
    eligibleStructures(userId: $userId, ignoreDistance: $ignoreDistance) {
      id
      federation
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
      capacity {
        bac
        bac1
        bac2
        bac4
        bac3
        bac5
        pasbac1
        pasbac5
        bacoubac3
        bac3oubac5
        random
      }
      expectations {
        name
      }
    }
  }
`;
export interface eligibleStructuresResponse {
  eligibleStructures: EligibleStructure[];
}
export const useEligibleStructures = (options: LazyQueryHookOptions<eligibleStructuresResponse> = {}) =>
  useLocalLazyQuery<eligibleStructuresResponse>(EligibleStructuresQuery, options);

export const allStructures = gql`
  {
    allStructures {
      id
      club_code
      name
      licensed_text
      fnv1a32_hash
      city
      geolocation {
        lat
        lng
      }
      referrer {
        firstName
        lastName
        email
      }
      capacity {
        bac
        bac1
        bac2
        bac4
        bac3
        bac5
        pasbac1
        pasbac5
        bacoubac3
        bac3oubac5
        random
      }
    }
  }
`;
export interface allStructuresResponse {
  allStructures: EligibleStructure[];
}
export const useAllStructures = (options: LazyQueryHookOptions<allStructuresResponse> = {}) =>
  useLocalLazyQuery<allStructuresResponse>(allStructures, options);

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

export const getPublicRecoQuery = gql`
  query publicStructure($token: String!) {
    publicStructure(token: $token) {
      club {
        name
        referrer {
          firstName
          lastName
        }
      }
      user {
        id
        email
        profile {
          firstName
          lastName
        }
      }
    }
  }
`;
export interface getPublicRecoResponse {
  publicStructure: {
    user: { id: string; email: string; profile: { firstName: string; lastName: string } };
    club: { name: string; referrer: { firstName: string; lastName: string }[] };
  };
}
export const useGetPublicReco = (options: LazyQueryHookOptions<getPublicRecoResponse> = {}) =>
  useLocalQuery<getPublicRecoResponse>(getPublicRecoQuery, options);

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

//
export const CandidateAffectationQuery = gql`
  query($userId: ID!) {
    user(id: $userId) {
      profile {
        firstName
        lastName
      }
      wc2023Affectation {
        specialite
        codeRegion
        recommendation {
          club {
            name
            referrer {
              firstName
              lastName
              email
            }
            city
          }
          status
        }
      }
    }
  }
`;

export const useCandidateAffectationData = (options: LazyQueryHookOptions<any> = {}) =>
  useLocalLazyQuery<any>(CandidateAffectationQuery, options);

export const AddAdvisorDecisionMutation = gql`
  mutation($candidateId: String!, $advisorDecision: String!, $advisorSelection: [String!]!, $codeRegion: String!) {
    addAdvisorDecision(
      candidateUserId: $candidateId
      advisorDecision: $advisorDecision
      advisorSelection: $advisorSelection
      codeRegion: $codeRegion
    ) {
      id
      wc2023Affectation {
        status
      }
    }
  }
`;
export interface addAdvisorDecisionParams {
  candidateId: string;
  advisorDecision: string;
  advisorSelection: string[];
  codeRegion: string;
}
export interface addAdvisorDecisionResponse {
  addAdvisorDecision: User;
}
export const useAddAdvisorDecision = (
  options: MutationHookOptions<addAdvisorDecisionResponse, addAdvisorDecisionParams> = {},
) => useLocalMutation<addAdvisorDecisionResponse, addAdvisorDecisionParams>(AddAdvisorDecisionMutation, options);

export const RegionsQuery = gql`
  query {
    campusRegions {
      id
      name
      code
      show
    }
  }
`;

export const useCampusRegions = (options: LazyQueryHookOptions<any> = {}) =>
  useLocalLazyQuery<any>(RegionsQuery, options);

export const updateWc2023RecoStatusMutation = gql`
  mutation UpdateWc2023RecoStatus($user: ID!, $status: String!, $textComment: String) {
    updateWc2023RecoStatus(user: $user, status: $status, textComment: $textComment) {
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

interface updateWc2023RecoStatusMutationParams {
  user: string;
  status: string;
  textComment?: string;
}

export const useUpdateWc2023RecoStatus = (
  options?: MutationHookOptions<{ updateWc2023RecoStatus: any }, updateWc2023RecoStatusMutationParams>,
) => useLocalMutation(updateWc2023RecoStatusMutation, options);

export const getConfigCampus = gql`
  query configs {
    configs {
      status
      statusAffectation
    }
  }
`;
interface getConfigCampusResponse {
  configs: {
    status: boolean;
    statusAffectation: boolean;
  };
}
export const useGetConfigCampus = (options: LazyQueryHookOptions<getConfigCampusResponse> = {}) =>
  useLocalLazyQuery<getConfigCampusResponse>(getConfigCampus, options);

export const ConfigCampusMutation = gql`
  mutation configs($status: Boolean, $statusAffectation: Boolean) {
    campusConfig(status: $status, statusAffectation: $statusAffectation) {
      status
      statusAffectation
    }
  }
`;
interface ConfigCampusParams {
  status: boolean;
  statusAffectation: boolean;
}

export const useUpdateConfigCampus = (options: MutationHookOptions<getConfigCampusResponse, ConfigCampusParams> = {}) =>
  useLocalMutation<getConfigCampusResponse, ConfigCampusParams>(ConfigCampusMutation, options);

export const confirmationAffectation = gql`
  mutation confirmationAffectation($userId: String!, $clubName: String!) {
    confirmationAffectation(userId: $userId, clubName: $clubName) {
      id
      email
    }
  }
`;
interface ConfirmationAffectationParams {
  userId: string;
  clubName: string;
}
interface ConfirmationAffectationResponse {}
export const useConfirmationAffectation = (
  options: MutationHookOptions<ConfirmationAffectationResponse, ConfirmationAffectationParams> = {},
) => useLocalMutation<ConfirmationAffectationResponse, ConfirmationAffectationParams>(confirmationAffectation, options);

const DisponibiliteQuery = gql`
  query getCapacity($idStructure: ID, $formation: String) {
    getCapacity(idStructure: $idStructure, formation: $formation)
  }
`;
interface DisponibiliteQueryParams {
  idStructure: string;
  formation: string;
}
interface DisponibiliteQueryResponse {
  getCapacity: string;
}

export const useDisponibiliteStructure = (
  options: LazyQueryHookOptions<DisponibiliteQueryResponse, DisponibiliteQueryParams> = {},
) => useLocalLazyQuery<DisponibiliteQueryResponse, DisponibiliteQueryParams>(DisponibiliteQuery, options);
