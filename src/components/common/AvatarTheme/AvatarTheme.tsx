import React, { forwardRef, Ref } from 'react';
import classNames from 'utils/classNames';
import check from 'assets/svg/check.svg';

import useStyles from './styles';

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
  size: number;
  className?: string;
  titleClassName?: string;
  children?: React.ReactChild | boolean | null;
  avatarCircleBackground?: string;
  checked?: boolean;
  squareContainerClassName?: string;
}

const AvatarTheme = forwardRef(
  (
    {
      title,
      size,
      className,
      titleClassName,
      children,
      avatarCircleBackground,
      checked,
      squareContainerClassName,
      ...rest
    }: Props,
    ref: Ref<HTMLDivElement>,
  ) => {
    const classes = useStyles({
      size,
      avatarCircleBackground,
    });
    return (
      <div className={classNames(classes.circle, className)} {...rest} ref={ref}>
        <div className={classNames(classes.squareContainer, squareContainerClassName)}>{children}</div>
        {title && (
          <p className={classNames(classes.title, titleClassName)}>
            {title}
            {checked && <img src={check} alt="check" className={classes.checked} />}
          </p>
        )}
      </div>
    );
  },
);

export default AvatarTheme;
