import gql from 'graphql-tag';

import { LazyQueryHookOptions } from '@apollo/react-hooks';
import { useLocalLazyQuery } from 'hooks/apollo';
import { Company } from './types';

export const GetImmersion = gql`
  query immersions(
    $rome_codes: String!
    $latitude: Float!
    $longitude: Float!
    $distance: Int!
    $page_size: Int
    $page: Int
    $headcount: String
    $sort: String
  ) {
    immersions(
      rome_codes: $rome_codes
      latitude: $latitude
      longitude: $longitude
      distance: $distance
      headcount: $headcount
      sort: $sort
      page_size: $page_size
      page: $page
    ) {
      companies {
        address
        contact_mode
        distance
        headcount_text
        lat
        naf_text
        lon
        url
        website
        name
        siret
      }
      companies_count
      rome_code
      rome_label
    }
  }
`;

export interface ImmersionResponseType {
  immersions: {
    companies: Company[];
    companies_count: string;
    rome_code: string;
    rome_label: string;
    url: string;
  };
}

export const useImmersion = (options: LazyQueryHookOptions = {}) => useLocalLazyQuery(GetImmersion, options);
