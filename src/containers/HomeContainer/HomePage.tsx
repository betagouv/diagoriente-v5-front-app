import React, { useContext } from 'react';
import { Switch } from 'react-router-dom';
import Route from 'components/ui/Route/Route';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import logo from 'assets/svg/diagoriente_logo_01_bg_transparent 2.svg';
import { useDidMount } from 'hooks/useLifeCycle';
import logCampus from 'assets/images/diagorient-campus.png';
import open from 'assets/svg/menu_close.svg';
import whiteMenu from 'assets/images/menu.png';
import UserContext from 'contexts/UserContext';
import { useGetConfigCampus } from 'requests/campus2023';

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
  const [configCall, configState] = useGetConfigCampus({ fetchPolicy: 'network-only' });
  useDidMount(() => {
    configCall();
  });
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route
          protected
          render={() => <HomeCompleted statusConfig={configState.data?.configs.status} />}
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
