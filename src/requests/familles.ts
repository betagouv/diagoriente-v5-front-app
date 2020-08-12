import gql from 'graphql-tag';

import { MutationHookOptions } from '@apollo/react-hooks';
import { useLocalQuery } from 'hooks/apollo';

export const familiesQuery = gql`
  query Families {
    families {
      data {
        id
        nom
        category
        resources
      }
    }
  }
`;

export interface FamiliesArguments {}
export interface FamiliesResponse {
  families: {
    data: {
      id: string;
      nom: string;
      category: string;
      resources: string[];
    }[];
  };
}
export const useFamilies = (options: MutationHookOptions<FamiliesResponse, FamiliesArguments> = {}) =>
  useLocalQuery<FamiliesResponse, FamiliesArguments>(familiesQuery, options);
