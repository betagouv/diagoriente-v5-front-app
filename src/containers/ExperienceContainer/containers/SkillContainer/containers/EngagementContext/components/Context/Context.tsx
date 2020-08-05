import React from 'react';
import Avatar from 'components/common/Avatar/Avatar';
import CheckBox from 'components/inputs/CheckBox/CheckBox';
import classNames from 'utils/classNames';
import Grid from '@material-ui/core/Grid';

import useStyles from './styles';

interface Props {
  title?: string;
  className?: string;
  checked?: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Context = ({ className, checked, handleChange, title }: Props) => {
  const classes = useStyles();
  return (
    <Grid item lg={3} className={classNames(classes.root, className)}>
      <Avatar size={80} />
      <span className={classNames(classes.title, checked&& classes.titleChecked)}>{title}</span>
      <CheckBox color="#00CFFF" className={classes.checkbox} checked={checked} onChange={handleChange} />
    </Grid>
  );
};

export default Context;
