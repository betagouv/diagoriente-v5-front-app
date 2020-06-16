import React from 'react';
import Button, { IProps } from 'components/button/Button';
import classNames from 'utils/classNames';

import Arrow from 'assets/svg/arrow';

import useStyles from './style';

const NextButton = ({ className, ...props }: IProps) => {
  const classes = useStyles();
  return (
    <Button
      type="submit"
      childrenClassName={classes.margin}
      className={classNames(classes.btnperso, className)}
      {...props}
    >
      <div className={classes.contentBtn}>
        <div className={classes.btnLabel}>Suivant</div>
        <Arrow color="#223A7A" width="12" height="12" />
      </div>
    </Button>
  );
};

export default NextButton;
