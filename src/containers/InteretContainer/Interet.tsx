import React, { useState, useContext } from 'react';
import { Switch } from 'react-router-dom';
import Route from 'components/ui/Route/Route';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NotFoundPage from 'components/layout/NotFoundPage';
import InterestContext from 'contexts/InterestSelected';
import logo from 'assets/svg/diagoriente_logo.svg';
import logCampus from 'assets/images/diagorient-campus.png';
import whiteMenu from 'assets/images/menu.png';
import UserContext from 'contexts/UserContext';
import { Families } from 'requests/types';
import HomeInteret from './containers/HomeInteret';
import MainInteret from './containers/MainInteret';
import ParcoursInteret from './containers/ParcourInteret';
import OrdreInteret from './containers/OrdreInteret/OrderInteret';
import ResultInteret from './containers/ResultInterest/ResultInterest';

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
  const { user } = useContext(UserContext);
  const [selectedInterest, setInterest] = useState<Families[] | null>(null);
  return (
    <ThemeProvider theme={theme}>
      <InterestContext.Provider value={{ selectedInterest, setInterest }}>
        <Switch>
          <Route
            protected
            privateHeaderProps={{
              openLogoIcon: logo,
              closeLogoIcon: user?.isCampus ? logCampus : logo,
              openIcon: whiteMenu,
            }}
            exact
            path="/interet"
            component={HomeInteret}
          />
          <Route
            privateHeaderProps={{
              openLogoIcon: logo,
              closeLogoIcon: user?.isCampus ? logCampus : logo,
              openIcon: whiteMenu,
            }}
            protected
            path="/interet/main"
            component={MainInteret}
          />
          <Route
            privateHeaderProps={{
              openLogoIcon: logo,
              closeLogoIcon: user?.isCampus ? logCampus : logo,
              openIcon: whiteMenu,
            }}
            protected
            path="/interet/parcours"
            component={ParcoursInteret}
          />
          <Route
            privateHeaderProps={{
              openLogoIcon: logo,
              closeLogoIcon: user?.isCampus ? logCampus : logo,
              openIcon: whiteMenu,
            }}
            protected
            path="/interet/ordre"
            component={OrdreInteret}
          />
          <Route
            privateHeaderProps={{
              openLogoIcon: logo,
              closeLogoIcon: user?.isCampus ? logCampus : logo,
              openIcon: whiteMenu,
            }}
            protected
            path="/interet/result"
            component={ResultInteret}
          />
          <Route
            privateHeaderProps={{
              openLogoIcon: logo,
              closeLogoIcon: user?.isCampus ? logCampus : logo,
              openIcon: whiteMenu,
            }}
            component={NotFoundPage}
          />
        </Switch>
      </InterestContext.Provider>
    </ThemeProvider>
  );
};

export default Interet;
