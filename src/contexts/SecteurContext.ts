import { createContext } from 'react';
import { QueryResult } from '@apollo/react-common';
import { ThemesResponse, ThemesArguments } from 'requests/themes';

const SecteurContext = createContext({} as QueryResult<ThemesResponse, ThemesArguments>);

export default SecteurContext;
