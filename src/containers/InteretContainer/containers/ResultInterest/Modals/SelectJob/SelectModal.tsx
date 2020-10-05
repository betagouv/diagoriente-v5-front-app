import React, { useContext, useEffect, useState, useRef } from 'react';
import parcoursContext from 'contexts/ParcourContext';
import useOnclickOutside from 'hooks/useOnclickOutside';
import { updateParcours, useUpdateParcour } from 'requests/parcours';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Select from 'containers/JobsContainer/components/Select/Select';
import { useHistory } from 'react-router-dom';
import Avatar from 'components/common/AvatarTheme/AvatarTheme';
// import CheckBox from 'components/inputs/CheckBox/CheckBox';
import Button from 'components/button/Button';
import classNames from 'utils/classNames';
import { useAccessibility } from 'requests/accessibility';
import useStyles from './style';

enum Steps {
  THEMES,
  ACCESSIBILITY,
}

const selectTheme = createMuiTheme({
  palette: {
    success: {
      main: '#00B2DB',
    },
    secondary: {
      main: '#7AE6FF',
    },
  },
});

const SelectModal = () => {
  const divSelect = useRef(null)
  const history = useHistory();
  const classes = useStyles();
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [accessibilityCall, accessibilityState] = useAccessibility();
  const { parcours, setParcours } = useContext(parcoursContext);
  const [step, setStep] = useState<Steps>(Steps.THEMES);
  const [updateCall, updateState] = useUpdateParcour();
  const [open, setOpen] = useState(false);
  const [accessibility, setAccessibility] = useState('');
  const isChecked = (id: string) => selectedThemes.includes(id);

  useEffect(() => {
    accessibilityCall();
    // eslint-disable-next-line
  }, []);

  useOnclickOutside(divSelect, () => {
    if (open) setOpen(false);
  });

  const addTheme = (id: string) => {
    const array = [...selectedThemes];
    if (isChecked(id)) {
      const index = array.indexOf(id);
      array.splice(index, 1);
      setSelectedThemes(array);
    } else {
      array.push(id);
      setSelectedThemes(array);
    }
  };

  const onValide = () => {
    updateCall({ variables: { skillsAlgo: selectedThemes, accessibility } });
  };

  useEffect(() => {
    if (updateState.data) {
      setParcours(updateState.data.updateParcour);
      history.push('/jobs');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateState.data]);

  switch (step) {
    case Steps.ACCESSIBILITY:
      return (
        <div className={classes.modalBody}>
          <div className={classes.titleModal}>
            Encore une petite chose !
            <br />
            2/2
          </div>
          <div className={classes.descriptionModal}>
            Pour nous aider à te proposer les pistes métiers les plus adaptées,
            <br />
            indique nous ton niveau de diplôme :
          </div>
          <div className={classes.accessibility}>
            <ThemeProvider theme={selectTheme}>
              <Select
                value={[accessibility]}
                onClick={() => setOpen(!open)}
                onSelectText={(e) => {
                  if (e) setAccessibility(e);
                }}
                reference={divSelect}
                placeholder={
                  accessibilityState.data?.accessibilities.data.find((a) => a.id === accessibility)?.name ||
                  'Niveau de diplôme'
                }
                options={accessibilityState.data?.accessibilities.data || []}
                open={open}
              />
            </ThemeProvider>
          </div>
          <div className={classes.btnContainerModal}>
            <Button disabled={!accessibility} className={classes.btn} onClick={onValide} fetching={updateState.loading}>
              <div className={classes.btnLabel}>Je valide</div>
            </Button>
          </div>
        </div>
      );
    default:
      return (
        <div className={classes.modalBody}>
          <div className={classes.titleModal}>
            Encore une petite chose !
            <br />
            1/2
          </div>
          <div className={classes.descriptionModal}>
            <div>Pour nous aider à te proposer des pistes métiers,</div>
            <div>coche les expériences qui comptent le plus pour toi:</div>
            <div className={classes.subTitle}>(Plusieurs choix possibles)</div>
          </div>

          <div className={classes.experienceContainer}>
            <div className={classes.expContainer}>
              <div className={classes.titlePerso}>Mes expériences perso</div>
              <div className={classes.themesContainer}>
                {parcours?.skills
                  .filter((p) => p.theme?.type === 'personal')
                  .map((pr) => (
                    <div
                      key={pr.theme.id}
                      className={classNames(
                        classes.themeContainer,
                        isChecked(pr.theme.id) && classes.themeContainerPersoSelected,
                      )}
                      onClick={() => addTheme(pr.theme.id)}
                    >
                      <Avatar size={65}>
                        <img src={pr.theme.resources?.icon} alt="" className={classes.avatarStyle} />
                      </Avatar>
                      <div className={classes.themeTitle}>{pr.theme.title.replace(/\//g, '')}</div>
                    </div>
                  ))}
              </div>
            </div>
            <div className={classes.expContainer}>
              <div className={classes.titlePro}>Mes expériences pro</div>
              <div className={classes.themesContainer}>
                {parcours?.skills
                  .filter((p) => p.theme?.type === 'professional')
                  .map((pr) => (
                    <div
                      key={pr.theme.id}
                      onClick={() => addTheme(pr.theme.id)}
                      className={classNames(
                        classes.themeContainer,
                        classes.themeContainerPro,
                        isChecked(pr.theme.id) && classes.themeContainerProSelected,
                      )}
                    >
                      <div className={classes.themeTitle}>{pr.theme.title}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className={classes.btnContainerModal}>
            <Button className={classes.btn} onClick={() => setStep(Steps.ACCESSIBILITY)} fetching={updateState.loading}>
              <div className={classes.btnLabel}>{selectedThemes.length > 0 ? 'Suivant' : 'Ignorer'}</div>
            </Button>
          </div>
        </div>
      );
  }
};

export default SelectModal;
