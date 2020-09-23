import React, { useState } from 'react';

import { User, UserParcour } from 'requests/types';
import { useDidMount } from 'hooks/useLifeCycle';
import startup from 'utils/startup';
import { useThemes } from 'requests/themes';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Switch, Route as BaseRoute } from 'react-router-dom';
import Route from 'components/ui/Route/Route';

import HomeContainer from 'containers/HomeContainer';
import LoginContainer from 'containers/LoginContainer';
import RegisterContainer from 'containers/RegisterContainer';
import InteretContainer from 'containers/InteretContainer';
import jobsContainer from 'containers/JobsContainer';
import ForgotPasswordContainer from 'containers/ForgotPassword';
import RenewPasswordContainer from 'containers/RenewPassword';
import ConfiramtionContainer from 'containers/Confirmation';
import GameContainer from 'containers/GameContainer';
import NotFoundPage from 'components/layout/NotFoundPage';
import UserContext from 'contexts/UserContext';
import ExperienceComponent from 'containers/ExperienceContainer';
import ParcourContext from 'contexts/ParcourContext';
import SecteurContext from 'contexts/SecteurContext';
import Recommendation from 'containers/RecommendationContainer';
import Profil from 'containers/ProfilContainer';
import AdminContainer from 'containers/AdminContainer';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#00CFFF' },
    secondary: { main: '#011A5E' },
    info: { main: '#223A7A' },
    background: {
      default: '#4D6EC5',
    },
    success: { main: '#00B2DB' },
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
  const [parcours, setParcours] = useState<UserParcour | null>(null);
  const secteursData = useThemes({ variables: { type: 'secteur' } });
  useDidMount(() => {
    startup().then((data) => {
      if (data) {
        setUser(data.user);
        setParcours(data.parcours);
      }
      setStartupEnd(true);
    });
  });

  if (!startupEnd) return <div />;

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ user, setUser }}>
        <ParcourContext.Provider value={{ parcours, setParcours }}>
          <SecteurContext.Provider value={secteursData}>
            <Switch>
              <BaseRoute exact path="/" component={HomeContainer} />
              <Route footer path="/login" exact component={LoginContainer} />
              <Route footer path="/register" exact component={RegisterContainer} />
              <Route footer path="/confirmation" exact component={ConfiramtionContainer} />
              <Route footer path="/recommendation" component={Recommendation} />
              <BaseRoute path="/profile" component={Profil} />
              <BaseRoute path="/interet" component={InteretContainer} />
              <Route footer path="/forgotPassword" exact component={ForgotPasswordContainer} />
              <Route footer path="/reset" exact component={RenewPasswordContainer} />
              <Route protected path="/experience" component={ExperienceComponent} />
              <BaseRoute path="/jobs" component={jobsContainer} />
              <BaseRoute path="/game" component={GameContainer} />
              <BaseRoute path="/admin" component={AdminContainer} />
              <Route component={NotFoundPage} />
            </Switch>
          </SecteurContext.Provider>
        </ParcourContext.Provider>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default RootContainer;
