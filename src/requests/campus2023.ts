import gql from 'graphql-tag';
import { LazyQueryHookOptions } from '@apollo/react-hooks';
import { useLocalLazyQuery } from '../hooks/apollo';

export const EligibleStructuresQuery = gql`
  query($userId: ID) {
    eligibleStructures(userId: $userId) {
      name
      licensed_text
      city
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

export const useEligibleStructures = (options: LazyQueryHookOptions<any> = {}) =>
  useLocalLazyQuery<any>(EligibleStructuresQuery, options);
