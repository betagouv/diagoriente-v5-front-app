import gql from 'graphql-tag';

import { QueryHookOptions } from '@apollo/react-hooks';
import { useLocalQuery } from 'hooks/apollo';

export const typeQuery = gql`
  {
    environments {
      data {
        id
        title
      }
    }
  }
`;

export interface TypeResponse {
  environments: {
    data: {
      id: string;
      title: string;
    }[];
  };
}

export const useTypeJob = (options: QueryHookOptions<TypeResponse> = {}) =>
  useLocalQuery<TypeResponse>(typeQuery, options);
