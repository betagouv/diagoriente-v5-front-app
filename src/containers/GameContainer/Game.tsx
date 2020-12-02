import React, { useContext } from 'react';
import { Switch } from 'react-router-dom';
import Route from 'components/ui/Route/Route';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NotFoundPage from 'components/layout/NotFoundPage';
import HomeGame from './containers/GameContainer';
import userContext from 'contexts/UserContext';

import logo from 'assets/svg/diagoriente_logo_01_bg_transparent 2.svg';
import logCampus from 'assets/images/diagorient-campus.png';
import open from 'assets/svg/menu_close.svg';
import whiteMenu from 'assets/images/menu.png';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#011A5E' },
    background: {
      default: '#011A5E',
    },
  },
});

const GameRoot = () => {
  const { user } = useContext(userContext);

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route
          privateHeaderProps={{
            closeLogoIcon: user?.isCampus ? logCampus : logo,
            openIcon: user?.isCampus ? whiteMenu : open,
            showUser: false,
          }}
          protected
          exact
          path="/game"
          component={HomeGame}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </ThemeProvider>
  );
};

export default GameRoot;
