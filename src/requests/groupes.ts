import gql from 'graphql-tag';
import { LazyQueryHookOptions } from '@apollo/react-hooks';
import { useLocalLazyQuery } from '../hooks/apollo';

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
