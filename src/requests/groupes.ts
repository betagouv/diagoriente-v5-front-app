import gql from 'graphql-tag';
import { LazyQueryHookOptions } from '@apollo/react-hooks';
import { useLocalLazyQuery } from '../hooks/apollo';
import { User, IGroup } from './types';

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
        advisorSelection {
          name
          club_code
        }
        recommendation {
          club {
            name
            city
            licensed_text
            referrer {
              firstName
              lastName
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
