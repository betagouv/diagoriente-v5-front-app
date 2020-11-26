import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'utils/classNames';
import useStyles from './styles';
interface Props {
  className?: string;
  title: string;
  titleCard: any;
  background: string;
  color: string;
  logo?: string;
  children: React.ReactChild | React.ReactChild[];
  path?: string;
  childrenCardClassName?: string;
}
const Card = ({
  title,
  titleCard,
  background,
  color,
  logo,
  children,
  className,
  path,
  childrenCardClassName,
}: Props) => {
  const classes = useStyles({ background, color });
  const Component = !path ? 'div' : Link;

  const content = (
    // @ts-ignore
    <Component to={path || ''} className={classes.link}>
      <div className={classNames(classes.titleContainer, logo && classes.titleSpacing)}>
        {logo && <img src={logo} alt=" " height={40} className={classes.logo} />}
        {title}
        {logo && <div className={classes.logo} />}
      </div>
    </Component>
  );

  return (
    <div className={classNames(classes.cardContainer, className)}>
      {titleCard}
      {content}
      <div className={classNames(classes.childrenCard, childrenCardClassName)}>{children}</div>
    </div>
  );
};
export default Card;
