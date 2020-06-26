import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import TitleSection from 'components/common/TitleSection/TitleSection';
import RadioButton from 'components/radioButton/RadioButton';
import AutoComplete from 'components/inputs/AutoComplete/AutoComplete';
import Button from 'components/button/Button';

import medaille from 'assets/svg/medaille.svg';
import LogoLocation from 'assets/form/location.png';

import useStyles from './styles';

const SecondRecommendation = () => {
  const classes = useStyles();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [value, setValue] = useState('');

  const title = (
    <span>
      Recommanderiez-vous le travail de Léna Mazilu à des recruteurs
      <br />
      (votre réponse restera confidentielle) ?
    </span>
  );
  const onSelect = (e: string | null) => {
    if (e) setSelectedLocation(e);
  };

  return (
    <div className={classes.container}>
      <TitleSection image={medaille} title={title} />
      <div className={classes.buttonContainer}>
        <div className={classes.buttonRadio}>
          <RadioButton
            label="Oui"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
      </div>
      <div className={classes.location}>
        <span className={classes.recommendation}>Pour finir, dans quelle commune se situe votre établissement ? </span>
        <AutoComplete
          containerClassName={classes.containerClassName}
          label=""
          value=""
          name="location"
          placeholder="paris"
          options={[]}
          onSelectText={onSelect}
          icon={LogoLocation}
        />
      </div>
      <div className={classes.btnContainerModal}>
        <Link to="location/done">
          <Button className={classes.btn} onClick={() => {}}>
            <div className={classes.btnLabel}>Terminer</div>
          </Button>
        </Link>
      </div>
      <Link to="/" className={classes.btnpreced}>
        Annuler
      </Link>
    </div>
  );
};
export default SecondRecommendation;
