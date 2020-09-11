import React, { useContext, useState } from 'react';
import parcoursContext from 'contexts/ParcourContext';
import { useUpdateParcour } from 'requests/parcours';
import { Redirect } from 'react-router-dom';
import Avatar from 'components/common/AvatarTheme/AvatarTheme';
// import CheckBox from 'components/inputs/CheckBox/CheckBox';
import Button from 'components/button/Button';
import classNames from 'utils/classNames';
import useStyles from './style';

const SelectModal = () => {
  const classes = useStyles();
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const { parcours } = useContext(parcoursContext);
  const [updateCall, updateState] = useUpdateParcour();
  const isChecked = (id: string) => selectedThemes.includes(id);

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
    updateCall({ variables: { skillsAlgo: selectedThemes } });
  };
  if (updateState.data && !updateState.error) {
    return <Redirect to="/jobs" />;
  }
  return (
    <div className={classes.modalBody}>
      <div className={classes.titleModal}>Encore une petite chose !</div>
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
        <Button className={classes.btn} onClick={onValide} fetching={updateState.loading}>
          <div className={classes.btnLabel}>Je valide</div>
        </Button>
      </div>
      {/*  <div className={classes.aide}>
          <div className={classes.aideText}>?</div>
        </div> */}
    </div>
  );
};

export default SelectModal;
