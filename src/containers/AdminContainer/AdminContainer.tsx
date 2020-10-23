import React, { useContext } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Switch, Route as BaseRoute, RouteComponentProps, Redirect } from 'react-router-dom';
import UserContext from 'contexts/UserContext';

import Route from 'components/ui/Route/Route';

import NotFoundPage from 'components/layout/NotFoundPage/NotFoundPage';
import ThemeContainer from './containers/ThemeContainer';
import ActivityContainer from './containers/ActivityContainer';
import ContextContainer from './containers/ContextContainer/ContextContainer';
import CompetenceContainer from './containers/CompetenceContainer';
import QuestionContainer from './containers/QuestionContainer';
import OptionContainer from './containers/OptionContainer';
import InstitutionContainer from './containers/InstitutionContainer';

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
              <BaseRoute path="/admin/themes" component={ThemeContainer} />
              <BaseRoute path="/admin/activities" component={ActivityContainer} />
              <BaseRoute path="/admin/contexts" component={ContextContainer} />
              <BaseRoute path="/admin/competences" component={CompetenceContainer} />
              <BaseRoute path="/admin/questions" component={QuestionContainer} />
              <BaseRoute path="/admin/options" component={OptionContainer} />
              <BaseRoute path="/admin/institution" component={InstitutionContainer} />
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
