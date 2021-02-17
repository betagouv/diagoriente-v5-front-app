import React from 'react';
import classNames from 'utils/classNames';

import {
 hasUppercase, hasLowercase, hasNumber, hasSpecial,
} from 'utils/validation';
import useStyles from './styles';

interface Props {
  password: string;
}
const PasswordValidation = ({ password }: Props) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.optionItem}>Ton mot de passe doit comporter 6 caractères minimum, dont au moins :</div>

      <div className={classes.option}>
        <div className={classes.optionWrapper}>
          <div className={classNames(classes.optionItem, hasUppercase(password) && classes.checkOption)}>
            • 1 majuscule
          </div>

          <div className={classNames(classes.optionItem, hasLowercase(password) && classes.checkOption)}>
            • 1 minuscule
          </div>
        </div>
        <div className={classes.optionWrapper}>
          <div className={classNames(classes.optionItem, hasNumber(password) && classes.checkOption)}>• 1 chiffre</div>
          <div className={classNames(classes.optionItem, hasSpecial(password) && classes.checkOption)}>
            • 1 caractère spécial
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordValidation;
