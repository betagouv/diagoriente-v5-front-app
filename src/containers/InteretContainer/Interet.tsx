import React, { useState } from 'react';
import { Switch } from 'react-router-dom';
import Route from 'components/ui/Route/Route';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NotFoundPage from 'components/layout/NotFoundPage';
import InterestContext from 'contexts/InterestSelected';
import { Families } from 'requests/types';
import HomeInteret from './containers/HomeInteret';
import MainInteret from './containers/MainInteret';
import ParcoursInteret from './containers/ParcourInteret';
import OrdreInteret from './containers/OrdreInteret/OrderInteret';
import ResultInteret from './containers/ResultInterest/ResultInterest';
// import useStyle from './styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#420FAB' },
    secondary: { main: '#A275FF' },
    background: {
      default: '#420FAB',
    },
    success: { main: '#7533FF' },
    info: { main: '#DDCCFF' },
  },
});

const Interet = () => {
  const [selectedInterest, setInterest] = useState<Families[] | null>(null);
  // const classes = useStyle();
  return (
    <ThemeProvider theme={theme}>
      <InterestContext.Provider value={{ selectedInterest, setInterest }}>
        <Switch>
          <Route protected exact path="/interet" component={HomeInteret} />
          <Route protected path="/interet/main" component={MainInteret} />
          <Route protected path="/interet/parcours" component={ParcoursInteret} />
          <Route protected path="/interet/ordre" component={OrdreInteret} />
          <Route protected path="/interet/result" component={ResultInteret} />
          <Route component={NotFoundPage} />
        </Switch>
        {/*  <div className={classes.aide}>
            <div className={classes.aideText}>?</div>
          </div> */}
      </InterestContext.Provider>
    </ThemeProvider>
  );
};

export default Interet;
