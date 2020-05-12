import React from 'react';
import { Interests } from 'requests/types';
import Placeholder from '../placeholderInterest/Placeholder';
import useStyles from './styles';

interface IProps {
  index: number;
  height: number;
  full?: boolean;
  famille?: Interests;
}
const InterestContainer = ({
 index, height, full, famille,
}: IProps) => {
  const classes = useStyles({ height, full });
  return (
    <div className={classes.root}>
      <div className={classes.index}>{index}</div>
      <div className={classes.container}>
        <Placeholder direction="vertical" size={36} famille={famille} />
      </div>
    </div>
  );
};

export default InterestContainer;
