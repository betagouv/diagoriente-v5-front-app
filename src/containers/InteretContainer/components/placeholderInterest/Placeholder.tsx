import React from 'react';
import { Families } from 'requests/types';
import Dotdotdot from 'react-dotdotdot';
import classNames from 'utils/classNames';

import useStyles from './styles';

interface IProps {
  index?: number;
  direction: 'horizontal' | 'vertical';
  size?: number;
  famille?: Families;
  circleClassName?: string;
  textFamilleClassName?: string;
  className?: string;
  marginTop?: number;
  full?: boolean;
  footer?: boolean;
}

const Placeholder = ({
  index,
  direction,
  size,
  famille,
  className,
  circleClassName,
  marginTop,
  textFamilleClassName,
  full,
  footer,
}: IProps) => {
  const classes = useStyles({
    direction,
    size,
    marginTop,
    full,
    footer,
  });
  const nom = famille?.nom;
  const res = nom && nom.replace(/\//g, '');
  return (
    <div className={classNames(classes.root, className)}>
      {famille ? (
        <div className={classes.imageContainer}>
          <img src={famille.resources[2]} alt="" />
        </div>
      ) : (
        <div className={classNames(classes.circle, circleClassName)}>
          <div className={classes.number}>{index || null}</div>
        </div>
      )}
      {famille ? (
        <div className={classNames(classes.textFamille, textFamilleClassName)}>
          <Dotdotdot clamp={5}>{res}</Dotdotdot>
        </div>
      ) : (
        <div className={classes.elements}>
          <div className={classes.bigElement} />
          <div className={classes.smallElement} />
          <div className={classes.bigElement} />
        </div>
      )}
    </div>
  );
};

export default Placeholder;
