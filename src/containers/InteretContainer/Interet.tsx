import React, { useState } from 'react';
import { Switch } from 'react-router-dom';
import Route from 'components/ui/Route/Route';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NotFoundPage from 'components/layout/NotFoundPage';
import InterestContext from 'contexts/InterestSelected';
import { Interests } from 'requests/types';
import HomeInteret from './HomeInteret';
import ParcoursInteret from './ParcourInteret';
import OrdreInteret from './OrdreInteret/OrderInteret';
import ResultInteret from './ResultInterest/ResultInterest';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#420FAB' },
    secondary: { main: '#A275FF' },
    background: {
      default: '#420FAB',
    },
    success: { main: '#7533FF' },
  },
});

const Interet = () => {
  const [selectedInterest, setInterest] = useState<Interests[] | null>(null);
  return (
    <ThemeProvider theme={theme}>
      <InterestContext.Provider value={{ selectedInterest, setInterest }}>
        <Switch>
          <Route protected exact path="/interet" component={HomeInteret} />
          <Route protected path="/interet/parcours" component={ParcoursInteret} />
          <Route protected path="/interet/ordre" component={OrdreInteret} />
          <Route protected path="/interet/result" component={ResultInteret} />
          <Route component={NotFoundPage} />
        </Switch>
      </InterestContext.Provider>
    </ThemeProvider>
  );
};

export default Interet;
