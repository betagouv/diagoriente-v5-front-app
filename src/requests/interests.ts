import gql from 'graphql-tag';

import { MutationHookOptions } from '@apollo/react-hooks';
import { useLocalQuery } from 'hooks/apollo';

export const interestQuery = gql`
  query Interest {
    interests {
      data {
        id
        nom
        rank
      }
    }
  }
`;

export interface InterestsArguments {}
export interface InterestsResponse {
  interests: {
    data: {
      id: string;
      nom: string;
      rank: number;
    }[];
  };
}
export const useInterests = (options: MutationHookOptions<InterestsResponse, InterestsArguments> = {}) =>
  useLocalQuery<InterestsResponse, InterestsArguments>(interestQuery, options);
