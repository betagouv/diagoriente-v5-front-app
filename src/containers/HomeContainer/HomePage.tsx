import React from 'react';
import { Switch } from 'react-router-dom';
import Route from 'components/ui/Route/Route';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NotFoundPage from 'components/layout/NotFoundPage';
import Home from './containers/Home';

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

const HomePage = () => (
  <ThemeProvider theme={theme}>
    <Switch>
      <Route protected exact path="/" component={Home} />
      <Route component={NotFoundPage} />
    </Switch>
  </ThemeProvider>
);

export default HomePage;
