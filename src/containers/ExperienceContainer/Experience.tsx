import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NotFoundPage from 'components/layout/NotFoundPage';

import SelectionContext from 'contexts/SelectionContext';

import ExperienceComponent from './containers/Experience/Experience';
import ThemeContainer from './containers/ThemeContainer';
import SkillContainer from './containers/SkillContainer';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#223A7A' },
    secondary: { main: '#00CFFF' },
    info: { main: '#011A5E' },
    background: {
      default: '#4D6EC5',
    },
  },
});

const Experience = () => {
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <SelectionContext.Provider value={{ open, setOpen }}>
        <Switch>
          <Route exact path="/experience" component={ExperienceComponent} />
          <Route path="/experience/theme" exact component={ThemeContainer} />
          <Route path="/experience/skill/:themeId" component={SkillContainer} />
          <Route component={NotFoundPage} />
        </Switch>
      </SelectionContext.Provider>
    </ThemeProvider>
  );
};

export default Experience;
