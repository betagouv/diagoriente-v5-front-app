import React from 'react';
import MuiButton, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import classNames from 'utils/classNames';
import useStyles from './style';

interface IProps extends ButtonProps {
  children?: React.ReactChild;
  className?: string;
  childrenClassName?: string;
  fetching?: boolean;
}

const Button = ({
 children, className, childrenClassName, fetching, ...rest
}: IProps) => {
  const classes = useStyles();
  return (
    <MuiButton className={classNames(className, classes.root)} {...rest}>
      <div className={classNames(childrenClassName, classes.labelContainer)}>
        {children}
        {fetching && (
          <div className="button_loader flex_center">
            <CircularProgress color="inherit" size={24} />
          </div>
        )}
      </div>
    </MuiButton>
  );
};

export default Button;
