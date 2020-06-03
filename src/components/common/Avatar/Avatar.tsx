import React from 'react';
import classNames from 'utils/classNames';
import useStyles from './styles';

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
  size: number;
  className?: string;
  titleClassName?: string;
  children?: React.ReactChild | boolean | null;
  avatarCircleBackground?: string;
}

const Avatar = ({
 title, size, className, titleClassName, children, avatarCircleBackground, ...rest
}: Props) => {
  const classes = useStyles({
    size,
    avatarCircleBackground,
  });
  return (
    <div className={classNames(classes.squareContainer, className)} {...rest}>
      <div className={classes.circle}>{children}</div>
      {title && <p className={classNames(classes.title, titleClassName)}>{title}</p>}
    </div>
  );
};

export default Avatar;
