import gql from 'graphql-tag';
import { LazyQueryHookOptions } from '@apollo/react-hooks';
import { useLocalLazyQuery } from '../hooks/apollo';
import { User } from './types';

export const MyGroupInfoQuery = gql`
  query {
    myGroup {
      id
      profile {
        firstName
        lastName
      }
      email
      location
      wc2023 {
        formation
        quality
        comment
        degree
        perimeter
      }
      addressCodes {
        postCode
        cityCode
      }
      wc2023Affectation {
        status
        specialite
        advisorDecision
        finalClub
        staps
        desengagement
        advisorSelection {
          id
          name
          club_code
          fnv1a32_hash
          capacity {
            bac3
            bac5
            random
          }
          referrer {
            firstName
            lastName
            email
          }
        }
        recommendation {
          status
          club {
            name
            id
            city
            licensed_text
            fnv1a32_hash
            capacity {
              bac3
              bac5
              random
            }
            referrer {
              firstName
              lastName
              email
            }
          }
        }
      }
      validateCampus
    }
  }
`;

export interface MyGroupInfoResponse {
  myGroup: {
    id: string;
    profile: {
      firstName: string;
      lastName: string;
    };
    email: string;
    location: string;
    wc2023: {
      formation: string;
      quality: string;
      comment: string;
    };
    addressCodes: {
      cityCode: string;
      postCode: string;
    };
    wc2023Affectation: {
      status: string;
      specialite: string;
      advisorDecision: string;
      desengagement: boolean;
      staps: boolean;
      advisorSelection: {
        name: string;
        club_code: string;
      }[];
      recommendation: {
        club: {
          name: string;
        };
      };
    };
    validateCampus: string;
  }[];
}

export const useMyGroup = (options: LazyQueryHookOptions<MyGroupInfoResponse> = {}) =>
  useLocalLazyQuery<MyGroupInfoResponse>(MyGroupInfoQuery, options);

export const groupesQuery = gql`
  query Groupes($codes: [String]) {
    groupes(codes: $codes) {
      data {
        code
        advisorId {
          email
          profile {
            firstName
            lastName
          }
        }
      }
    }
  }
`;

interface GroupesParams {
  codes?: string[];
}

interface GroupesResponse {
  groupes: {
    data: { code: string; advisorId: User }[];
  };
}

export const useGroups = (options: LazyQueryHookOptions<GroupesResponse, GroupesParams> = {}) =>
  useLocalLazyQuery(groupesQuery, options);
