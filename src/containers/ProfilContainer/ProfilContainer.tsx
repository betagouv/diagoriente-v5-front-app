import React from 'react';
import Route from 'components/ui/Route/Route';
import { Switch } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NotFoundPage from 'components/layout/NotFoundPage';

import ExperienceProfil from './components/ExperienceComponent/ExperienceProfil';
import ProfilComponent from './components/ProfilComponent/ProfilComponent';
import InteretProfil from './components/InteretComponent/InteretComponent';
import CardContainer from './containers/CardContainer';

export const CONTAINER_PADDING = '30px 70px 80px 70px';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#223A7A' },
    secondary: { main: '#00CFFF' },
    info: { main: '#011A5E' },
    background: {
      default: '#D60051',
    },
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#fff',
        color: '#424242',
        fontFamily: 'Andika New Basic',
        fontSize: 14,
        padding: 25,
        borderRadius: 23,
        boxShadow:
          '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
      },
      arrow: {
        color: '#fff',
        fontSize: 12,
      },
      popper: {
        margin: '0px 10px',
      },
    },
  },
});

const Profil = () => (
  <ThemeProvider theme={theme}>
    <Switch>
      <Route protected exact path="/profil" component={ProfilComponent} />
      <Route protected exact path="/profil/experience" component={ExperienceProfil} />
      <Route protected exact path="/profil/interest" component={InteretProfil} />
      <Route footer protected exact path="/profil/card" component={CardContainer} />
      <Route component={NotFoundPage} />
    </Switch>
  </ThemeProvider>
);

export default Profil;
