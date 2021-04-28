import gql from 'graphql-tag';

import { QueryHookOptions, MutationHookOptions } from '@apollo/react-hooks';
import { useLocalQuery, useLocalLazyQuery, useLocalMutation } from 'hooks/apollo';
import { Institution, Addresse } from './types';

// Get all Institutions
export const institutionsQuery = gql`
  query Institutions($search: String, $page: Int, $perPage: Int) {
    institutions(search: $search, page: $page, perPage: $perPage) {
      perPage
      page
      totalPages
      count
      data {
        id
        nom
        label
        longitude
        latitude
      }
    }
  }
`;
export interface InstitutionsArguments {
  search?: string;
  page?: number;
  perPage?: number;
}
export interface InstitutionsResponse {
  institutions: {
    data: Institution[];
    perPage: number;
    page: number;
    totalPages: number;
    count: number;
  };
}
export const useInstitutions = (options: QueryHookOptions<InstitutionsResponse, InstitutionsArguments> = {}) =>
  useLocalQuery<InstitutionsResponse, InstitutionsArguments>(institutionsQuery, options);

// Add Institutions
export const addInstitution = gql`
  mutation AddInstitution($nom: String!, $label: String!, $longitude: Float!, $latitude: Float!) {
    addInstitution(nom: $nom, label: $label, longitude: $longitude, latitude: $latitude) {
      nom
      label
      longitude
      latitude
    }
  }
`;
export interface AddInstitutionParams {
  nom: string;
  label: string;
  longitude: number;
  latitude: number;
}
export interface AddInstitutionResponse {
  institution: {
    label: string;
    nom: string;
    longitude: number;
    latitude: number;
  };
}
export const useAddInstitution = (
  options?: MutationHookOptions<{ addInstitution: Institution }, AddInstitutionParams>,
) => useLocalMutation(addInstitution, options);

// Get one Institutions
export const institutionQuery = gql`
  query Institution($id: ID!) {
    institution(id: $id) {
      id
      nom
      label
      longitude
      latitude
    }
  }
`;

export interface InstitutionResponse {
  institution: Institution;
}
export const useInstitution = (options: QueryHookOptions<InstitutionResponse, { id: string }> = {}) =>
  useLocalQuery(institutionQuery, options);

export const useLazyInstitution = (options: QueryHookOptions<InstitutionResponse, { id: string }> = {}) =>
  useLocalLazyQuery(institutionQuery, options);

// Delete Institution
export const deleteInstitution = gql`
  mutation DeleteInstitution($id: ID!) {
    deleteInstitution(id: $id)
  }
`;
export const useDeleteInstitution = (options: MutationHookOptions = {}) => useLocalMutation(deleteInstitution, options);

// update Institution
export const updateInstitutionMutation = gql`
  mutation UpdateInstitution($id: ID!, $nom: String!, $label: String!, $longitude: Float!, $latitude: Float!) {
    updateInstitution(id: $id, nom: $nom, label: $label, longitude: $longitude, latitude: $latitude) {
      nom
      label
      longitude
      latitude
    }
  }
`;
export interface UpdateInstitutionParams extends Partial<AddInstitutionParams> {
  id: string;
}
export interface UpdateInstitutionResponse {
  institution: {
    label: string;
    nom: string;
    longitude: number;
    latitude: number;
  };
}
export const useUpdateInstitution = (
  options?: MutationHookOptions<{ updateInstitution: Institution }, UpdateInstitutionParams>,
) => useLocalMutation(updateInstitutionMutation, options);

// Get address Institutions
export const addressesQuery = gql`
  query Addresses($search: String) {
    addresses(search: $search) {
      type
      query
      attribution
      features {
        text
        place_name
        center
        geometry {
          coordinates
          type
        }
      }
    }
  }
`;
export interface AddresseArguments {
  search?: string;
}
export interface AddresseResponse {
  addresses: Addresse;
}
export const useAddresses = (options: QueryHookOptions<AddresseResponse, AddresseArguments> = {}) =>
  useLocalLazyQuery<AddresseResponse, AddresseArguments>(addressesQuery, options);
