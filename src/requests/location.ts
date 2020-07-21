import gql from 'graphql-tag';

import { QueryHookOptions } from '@apollo/react-hooks';
import { useLocalQuery } from 'hooks/apollo';

export const locationQuery = gql`
  query Location($search: String) {
    location(search: $search) {
      label
      coordinates
    }
  }
`;
export interface LocationArguments {}
export interface LocationResponse {
  location: {
    label: string;
    coordinates: string[];
  }[];
}
export const useLocation = (options: QueryHookOptions<LocationResponse, LocationArguments> = {}) =>
  useLocalQuery<LocationResponse, LocationArguments>(locationQuery, options);
