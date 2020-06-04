import React from 'react';
import { Families } from 'requests/types';
import RestLogo from 'components/common/Rest/Rest';
import Placeholder from '../placeholderInterest/Placeholder';
import useStyles from './styles';

interface IProps {
  index: number;
  height: number;
  full?: boolean;
  famille?: Families;
  handleClick?: (famille: Families) => void;
}
const InterestContainer = ({
  index, height, full, famille, handleClick,
}: IProps) => {
  const classes = useStyles({ height, full });
  return (
    <div className={classes.root}>
      <div className={classes.index}>{index}</div>
      <div className={classes.container}>
        {full && (
          <div className={classes.resetLogo} onClick={handleClick && famille ? () => handleClick(famille) : () => {}}>
            <RestLogo color="#420FAB" size={20} />
          </div>
        )}
        <Placeholder direction="vertical" size={36} famille={famille} />
      </div>
    </div>
  );
};

export default InterestContainer;
