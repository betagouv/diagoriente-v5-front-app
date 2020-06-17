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

const AvatarTheme = ({
    title, size, className, titleClassName, children, avatarCircleBackground, ...rest
}: Props) => {
  const classes = useStyles({
    size,
    avatarCircleBackground,
  });
  return (
    <div className={classNames(classes.circle, className)} {...rest}>
      <div className={classes.squareContainer}>{children}</div>
      {title && (
        <p className={classNames(classes.title, titleClassName)}>
          <div className={classes.titleSize}>{title}</div>
        </p>
      )}
    </div>
  );
};

export default AvatarTheme;
