import gql from 'graphql-tag';

import { QueryHookOptions } from '@apollo/react-hooks';
import { useLocalQuery } from 'hooks/apollo';

import { Theme } from './types';

export const themesQuery = gql`
  query Themes($type: String) {
    themes(type: $type) {
      data {
        id
        title
        resources {
          icon
          backgroundColor
        }
      }
    }
  }
`;

export interface ThemesArguments {
  type?: 'professional' | 'personal';
}

export interface ThemesResponse {
  themes: {
    data: Omit<Theme, 'activities'>[];
  };
}

export const useThemes = (options: QueryHookOptions<ThemesResponse, ThemesArguments> = {}) =>
  useLocalQuery<ThemesResponse, ThemesArguments>(themesQuery, options);

export const themeQuery = gql`
  query Theme($id: ID!) {
    theme(id: $id) {
      id
      title
      type
      resources {
        icon
        backgroundColor
      }
      activities {
        id
        title
        description
      }
      tooltips {
        competenceId
        tooltip
      }
    }
  }
`;

export interface ThemeResponse {
  theme: Theme;
}

export interface ThemeArguments {
  id: string;
}
export const useTheme = (options: QueryHookOptions<ThemeResponse, ThemeArguments> = {}) =>
  useLocalQuery<ThemeResponse, ThemeArguments>(themeQuery, options);

  export const secteurQuery = gql`
  query Themes($type: String) {
    themes(type: $type) {
      data {
        id
        title
        resources {
          icon
          backgroundColor
        }
      }
    }
  }
`;

export interface SecteurArguments {
  type?: 'secteur';
}

export interface SectureResponse {
  themes: {
    data: any;
  };
}

export const useSecteurs = (options: QueryHookOptions<SectureResponse, SecteurArguments> = {}) =>
  useLocalQuery<SectureResponse, SecteurArguments>(secteurQuery, options);
