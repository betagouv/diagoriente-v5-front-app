import React, { useContext } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Switch, Route as BaseRoute, RouteComponentProps, Redirect } from 'react-router-dom';
import UserContext from 'contexts/UserContext';

import Route from 'components/ui/Route/Route';

import NotFoundPage from 'components/layout/NotFoundPage/NotFoundPage';
import ThemeContainer from './containers/ThemeContainer';
import ActivityContainer from './containers/ActivityContainer';
import ContextContainer from './containers/ContextContainer';
import CompetenceContainer from './containers/CompetenceContainer';
import QuestionContainer from './containers/QuestionContainer';
import OptionContainer from './containers/OptionContainer';
import InstitutionContainer from './containers/InstitutionContainer';
import UserContainer from './containers/UserContainer';
import ParamContainer from './containers/ParamContainer';

import useStyles from './styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2979ff' },
    secondary: { main: '#3f51b5' },
    background: { default: '#2979ff' },
  },
  typography: { fontFamily: 'Andika New Basic' },
});

const AdminContainer = ({ match }: RouteComponentProps) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  const children = (
    <Route
      protected
      authorizedRole="admin"
      render={() => {
        if (match.isExact) return <Redirect to="/admin/themes" />;
        return (
          <div className={classes.container}>
            <Switch>
              <Route protected path="/admin/themes" component={ThemeContainer} />
              <Route protected path="/admin/activities" component={ActivityContainer} />
              <Route protected path="/admin/contexts" component={ContextContainer} />
              <Route protected path="/admin/competences" component={CompetenceContainer} />
              <Route protected path="/admin/questions" component={QuestionContainer} />
              <Route protected path="/admin/options" component={OptionContainer} />
              <Route protected path="/admin/institution" component={InstitutionContainer} />
              <Route protected path="/admin/users" component={UserContainer} />
              <Route protected path="/admin/parametre" component={ParamContainer} />

              <NotFoundPage />
            </Switch>
          </div>
        );
      }}
    />
  );

  if (!user) {
    return children;
  }

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AdminContainer;
