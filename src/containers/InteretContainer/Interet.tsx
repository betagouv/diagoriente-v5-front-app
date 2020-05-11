import React from 'react';
import { Switch } from 'react-router-dom';
import Route from 'components/ui/Route/Route';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NotFoundPage from 'components/layout/NotFoundPage';
import HomeInteret from './HomeInteret';
import ParcoursInteret from './ParcourInteret';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#420FAB' },
    secondary: { main: '#A275FF' },
    background: {
      default: '#420FAB',
    },
  },
});

const Interet = () => (
  <ThemeProvider theme={theme}>
    <Switch>
      <Route protected exact path="/interet" component={HomeInteret} />
      <Route protected path="/interet/parcours" component={ParcoursInteret} />
      <Route component={NotFoundPage} />
    </Switch>
  </ThemeProvider>
);

export default Interet;
