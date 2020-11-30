import React, { useContext } from 'react';
import { Switch } from 'react-router-dom';
import Route from 'components/ui/Route/Route';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import logo from 'assets/svg/diagoriente_logo_01_bg_transparent 2.svg';
import logCampus from 'assets/images/diagorient-campus.png'
import open from 'assets/svg/menu_close.svg';
import whiteMenu from 'assets/images/menu.png';
import UserContext from 'contexts/UserContext';

import useStyles from './styles';

import HomeCompleted from './components/HomeCompleted';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#011A5E' },
    secondary: { main: '#223A7A' },
    background: {
      default: '#011A5E',
    },
    success: { main: '#4D6EC5' },
  },
});

const HomeContainer = () => {
  const { user } = useContext(UserContext);
  const isCampus = user?.isCampus;
  const classes = useStyles({ isCampus });

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route
          protected
          component={HomeCompleted}
          privateHeaderProps={{
            closeLogoIcon: isCampus ? logCampus : logo,
            openIcon: isCampus ? whiteMenu : open,
            className: classes.header,
            showUser: false,
          }}
        />
      </Switch>
    </ThemeProvider>
  );
};

export default HomeContainer;
