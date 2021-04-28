import gql from 'graphql-tag';

import { LazyQueryHookOptions } from '@apollo/react-hooks';
import { useLocalLazyQuery } from 'hooks/apollo';

export const regionContextQuery = gql`
  {
    regionsContext {
      id
      label
    }
  }
`;

export interface RegionResponse {
  regionsContext: {
    id: string;
    label: string;
  }[];
}
export const useRegionContextQuery = (options: LazyQueryHookOptions<RegionResponse, {}> = {}) =>
  useLocalLazyQuery(regionContextQuery, options);
