import React from 'react';

import Done from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';

import useStyles from './styles';

interface VerifiedProps {
  verified: boolean;
}

const VerifiedIcon = ({ verified }: VerifiedProps) => {
  const classes = useStyles();
  return (
    <div className={classes.iconsContainer}>
      {verified ? <Done className={classes.success} /> : <Clear color="error" />}
    </div>
  );
};

export default VerifiedIcon;
