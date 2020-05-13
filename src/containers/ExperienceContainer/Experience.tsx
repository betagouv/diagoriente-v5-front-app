import React, { useState } from 'react';
import { Switch } from 'react-router-dom';
import Route from 'components/ui/Route/Route';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NotFoundPage from 'components/layout/NotFoundPage';
import ThemeContext from 'contexts/ThemeContext';
import SelectionContext from 'contexts/SelectionContext';
import ExperienceComponent from './components/Experience/Experience';
import ExperiencePerso from './components/ExperiencePerso/ExperiencePerso';
import ExperienceActivity from './components/ExperienceActivity/ExperienceActivity';
import ExperienceCompetence from './components/ExperienceCompetence/ExperienceCompetence';

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
  const [selection, setSelection] = useState({
 id: '', title: '', icon: '', background: '',
});

  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ open, setOpen }}>
        <SelectionContext.Provider
          value={{
            themeId: selection.id,
            themeTitle: selection.title,
            themeIcon: selection.icon,
            themeBackground: selection.background,
            setSelection,
          }}
        >
          <Switch>
            <Route protected exact path="/experience" component={ExperienceComponent} />
            <Route protected path="/experience/perso" exact component={ExperiencePerso} />
            <Route protected path="/experience/perso/:themeId/activities" exact component={ExperienceActivity} />
            <Route protected path="/experience/perso/:themeId/competences" exact component={ExperienceCompetence} />
            <Route component={NotFoundPage} />
          </Switch>
        </SelectionContext.Provider>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

export default Experience;
