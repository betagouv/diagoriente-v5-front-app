import React from 'react';
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
  circleClassName?: string;
  checked?: boolean;
}

const Avatar = ({
  title,
  size,
  className,
  titleClassName,
  children,
  avatarCircleBackground,
  circleClassName,
  checked,
  ...rest
}: Props) => {
  const classes = useStyles({
    size,
    avatarCircleBackground,
  });
  return (
    <div className={classNames(classes.squareContainer, className)} {...rest}>
      <div className={classNames(classes.circle, circleClassName)}>{children}</div>
      {title && (
        <p className={classNames(classes.title, titleClassName)}>
          {title}
          {checked && <img src={check} alt="check" className={classes.checked} />}
        </p>
      )}
    </div>
  );
};

export default Avatar;
