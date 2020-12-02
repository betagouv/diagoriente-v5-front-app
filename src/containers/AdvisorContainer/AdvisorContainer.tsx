import React, { useContext } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Switch, Route as BaseRoute, RouteComponentProps, Redirect } from 'react-router-dom';
import UserContext from 'contexts/UserContext';

import Route from 'components/ui/Route/Route';

import NotFoundPage from 'components/layout/NotFoundPage/NotFoundPage';
import ParcoursContainer from './containers/ParcoursContainer/Parcours';

import useStyles from './style';

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
      authorizedRole={'advisor'}
      render={() => {
        if (match.isExact) return <Redirect to="/advisor/parcours" />;
        return (
          <div className={classes.container}>
            <Switch>
              <BaseRoute path="/advisor/parcours" component={ParcoursContainer} />
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
