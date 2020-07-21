import React from 'react';
import Button, { IProps } from 'components/button/Button';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import classNames from 'utils/classNames';

import Arrow from 'assets/svg/arrow';

import useStyles from './style';

interface Props {
  classNameTitle?: string;
  ArrowColor?: string;
  fetching?: boolean;
  children?: React.ReactChild;
}

const NextButton = ({ className, classNameTitle, ArrowColor, fetching, children, ...props }: IProps & Props) => {
  const classes = useStyles();
  return (
    <Button
      type="submit"
      childrenClassName={classes.margin}
      className={classNames(classes.btnperso, className)}
      {...props}
    >
      <div className={classes.contentBtn}>
        <div className={classNames(classes.btnLabel, classNameTitle)}>{children || 'Suivant'}</div>
        <Arrow color={ArrowColor || '#223A7A'} width="12" height="12" className={classes.arrow} />
        {fetching && (
          <div className={classes.loaderContainer}>
            <CircularProgress classes={{ colorPrimary: classes.colorPrimaryLoader }} size={24} />
          </div>
        )}
      </div>
    </Button>
  );
};

export default NextButton;
