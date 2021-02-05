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
      }
      wc2023Affectation {
        status
        specialite
        recommendation {
          club {
            name
          }
        }
      }
      validateCampus
    }
  }
`;

type MyGroupInfoResponse = {};

export const useMyGroup = (options: LazyQueryHookOptions = {}) => useLocalLazyQuery(MyGroupInfoQuery, options);

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
