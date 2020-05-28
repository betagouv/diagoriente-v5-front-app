import React from 'react';
import { Switch } from 'react-router-dom';
import Route from 'components/ui/Route/Route';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NotFoundPage from 'components/layout/NotFoundPage';
import HomeGame from './containers/GameContainer';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#011A5E' },
    background: {
      default: '#011A5E',
    },
  },
});

const GameRoot = () => (
  <ThemeProvider theme={theme}>
    <Switch>
      <Route protected exact path="/game" component={HomeGame} />
      <Route component={NotFoundPage} />
    </Switch>
  </ThemeProvider>
);

export default GameRoot;
