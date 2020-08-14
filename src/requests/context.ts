import gql from 'graphql-tag';

import { QueryHookOptions } from '@apollo/react-hooks';
import { useLocalQuery } from 'hooks/apollo';

export const ContextQuery = gql`
  {
    contexts {
      data {
        id
        title
        description
        icon
      }
    }
  }
`;

export interface ContextResponse {
  contexts: {
    data: {
      id: string;
      title: string;
      description: string;
      icon:string
    }[];
  };
}

export const useContext = (context: QueryHookOptions<ContextResponse> = {}) =>
  useLocalQuery<ContextResponse>(ContextQuery, context);
