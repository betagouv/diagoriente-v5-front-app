import gql from 'graphql-tag';
import { LazyQueryHookOptions } from '@apollo/react-hooks';
import { useLocalLazyQuery } from '../hooks/apollo';
import { User } from './types';

export const MyGroupInfoQuery = gql`
  query {
    myGroup {
      users {
        id
        profile {
          firstName
          lastName
        }
        location
        wc2023 {
          formation
          quality
          comment
        }
        validateCampus
        eligibleStructuresCountWC2023
      }
    }
  }
`;

type MyGroupInfoResponse = any;

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
