import React from 'react';
import { Families } from 'requests/types';
import RestLogo from 'components/common/Rest/Rest';
import classNames from 'utils/classNames';
import Placeholder from '../placeholderInterest/Placeholder';

import useStyles from './styles';

interface IProps {
  index: number;
  height: number;
  full?: boolean;
  famille?: Families;
  handleClick?: (famille: Families) => void;
  className?: string;
  resetClassName?: string;
  circleClassName?: string;
  containerClassName?: string;
  textFamilleClassName?: string;
  marginTop?: number;
}
const InterestContainer = ({
  index,
  height,
  full,
  famille,
  className,
  containerClassName,
  resetClassName,
  circleClassName,
  textFamilleClassName,
  marginTop,
  handleClick,
}: IProps) => {
  const classes = useStyles({ height, full });
  return (
    <div className={classes.root}>
      <div className={classNames(classes.index, textFamilleClassName)}>{index}</div>
      <div className={classNames(classes.container, containerClassName)}>
        {full && (
          <div
            className={classNames(classes.resetLogo, resetClassName)}
            onClick={handleClick && famille ? () => handleClick(famille) : () => {}}
          >
            <RestLogo color="#420FAB" size={20} />
          </div>
        )}
        <Placeholder
          direction="vertical"
          size={36}
          famille={famille}
          className={className}
          marginTop={marginTop}
          circleClassName={circleClassName}
          textFamilleClassName={textFamilleClassName}
          full={full}
          footer
        />
      </div>
    </div>
  );
};

export default InterestContainer;
