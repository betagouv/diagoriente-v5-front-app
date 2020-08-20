import React from 'react';
import Route from 'components/ui/Route/Route';
import { Switch } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NotFoundPage from 'components/layout/NotFoundPage';

import ExperienceProfil from './components/ExperienceComponent/ExperienceProfil';
import ProfilComponent from './components/ProfilComponent/ProfilComponent';
import InteretProfil from './components/InteretComponent/InteretComponent';
import InfoProfil from './components/InfoProfil/InfoProfil';
import Game from './containers/GameContainer/GameContainer';

import CardContainer from './containers/CardContainer';

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
      <Route protected exact path="/profile" component={ProfilComponent} />
      <Route protected exact path="/profile/experience" component={ExperienceProfil} />
      <Route protected exact path="/profile/interest" component={InteretProfil} />
      <Route protected exact path="/profile/info" component={InfoProfil} />
      <Route protected exact path="/profile/game" component={Game} />
      <Route footer protected exact path="/profile/card" component={CardContainer} />
      <Route component={NotFoundPage} />
    </Switch>
  </ThemeProvider>
);

export default Profil;
