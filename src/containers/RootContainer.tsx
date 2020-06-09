import React, { useState } from 'react';

import { User } from 'requests/types';
import { useDidMount } from 'hooks/useLifeCycle';
import startup from 'utils/startup';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Switch } from 'react-router-dom';
import Route from 'components/ui/Route/Route';

import HomeContainer from 'containers/HomeContainer';
import LoginContainer from 'containers/LoginContainer';
import RegisterContainer from 'containers/RegisterContainer';
import InteretContainer from 'containers/InteretContainer';
import ForgotPasswordContainer from 'containers/ForgotPassword';
import NotFoundPage from 'components/layout/NotFoundPage';
import UserContext from 'contexts/UserContext';
import ExperienceComponent from './ExperienceContainer/components/ExperiencePerso/ExperiencePerso';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#00CFFF' },
    secondary: { main: '#011A5E' },
    info: { main: '#223A7A' },
    background: {
      default: '#4D6EC5',
    },
    error: {
      main: '#FF0060',
    },
  },
  typography: {
    fontFamily: 'Andika New Basic',
  },
});
const RootContainer = () => {
  const [startupEnd, setStartupEnd] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useDidMount(() => {
    startup().then((nextUser) => {
      if (nextUser) setUser(nextUser);
      setStartupEnd(true);
    });
  });

  if (!startupEnd) return <div />;

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
          <Route footer exact path="/" component={HomeContainer} />
          <Route footer path="/login" exact component={LoginContainer} />
          <Route footer path="/register" exact component={RegisterContainer} />
          <Route protected path="/interet" component={InteretContainer} />
          <Route footer path="/forgotPassword" exact component={ForgotPasswordContainer} />
          <Route path="/experience" exact component={ExperienceComponent} />
          <Route component={NotFoundPage} />
        </Switch>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default RootContainer;
