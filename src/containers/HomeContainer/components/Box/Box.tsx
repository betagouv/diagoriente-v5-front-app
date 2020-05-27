import React from 'react';
import Button from 'components/button/Button';
import { Link } from 'react-router-dom';
import useStyles from './styles';

interface IProps {
  title: string;
  logo?: string;
  subTitle: string;
  color: string;
  link: string;
}

const Box = ({
 title, logo, subTitle, color, link,
}: IProps) => {
  const classes = useStyles({ color });
  return (
    <div className={classes.root}>
      <div className={classes.logoContainer}>{logo}</div>
      <div className={classes.titleBox}>{title}</div>
      <div className={classes.subTitleBox}>{subTitle}</div>
      <Link to={link}>
        <Button className={classes.btn}>
          <span className={classes.btnLabel}>C&lsquo;est partie</span>
        </Button>
      </Link>
    </div>
  );
};

export default Box;
