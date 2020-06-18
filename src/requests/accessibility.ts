import gql from 'graphql-tag';

import { QueryHookOptions } from '@apollo/react-hooks';
import { useLocalQuery } from 'hooks/apollo';

export const accessibilityQuery = gql`
  {
    accessibilities {
      data {
        id
        name
      }
    }
  }
`;

export interface AccessibilityResponse {
  accessibilities: {
    data: {
      id: string;
      name: string;
    }[];
  };
}

export const useAccessibility = (options: QueryHookOptions<AccessibilityResponse> = {}) =>
  useLocalQuery<AccessibilityResponse>(accessibilityQuery, options);
