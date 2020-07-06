import React, { useState } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { useGetSkill } from 'requests/skills';

import {
 Switch, Route, RouteComponentProps, Redirect,
} from 'react-router-dom';
import NotFoundPage from 'components/layout/NotFoundPage';
import { decodeUri } from 'utils/url';
import FirstRecommendation from './components/FirstRecommendation/FirstRecommendation';
import SecondRecommendation from './components/SecondRecommendation/SecondRecommendation';
import DoneRecommendation from './components/DoneRecommendation/DoneRecommendation';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#7AE6FF' },
    secondary: { main: '#00CFFF' },
    info: { main: '#011A5E' },
    background: {
      default: '#00B2DB',
    },
  },
});

const Recommendation = ({ match, location }: RouteComponentProps) => {
  const { token } = decodeUri(location.search);
  const { data, error } = useGetSkill({ variables: { token } });
  const [comment, setComment] = useState('');

  if (error) return <Redirect to="/" />;

  if (!data) return <div />;

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route
          exact
          path={match.path}
          render={(props) => (
            <FirstRecommendation {...props} comment={comment} setComment={setComment} skill={data.publicSkill} />
          )}
        />
        <Route
          exact
          path={`${match.path}/complete`}
          render={(props) => {
            if (!comment) return <Redirect to={`${match.url}${location.search}`} />;
            return <SecondRecommendation {...props} skill={data.publicSkill} comment={comment} />;
          }}
        />
        <Route exact path={`${match.path}/done`} render={() => <DoneRecommendation skill={data.publicSkill} />} />
        <Route component={NotFoundPage} />
      </Switch>
    </ThemeProvider>
  );
};

export default Recommendation;
