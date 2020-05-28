import React from 'react';
import Button from 'components/button/Button';
import { Link } from 'react-router-dom';
import useStyles from './styles';

interface IProps {
  title: string;
  logo?: string;
  subTitle: string;
  color: string;
  colorText: string;
  link: string;
}

const Box = ({ title, logo, subTitle, color, link, colorText }: IProps) => {
  const classes = useStyles({ color, colorText });
  return (
    <div className={classes.root}>
      <div className={classes.logoContainer}>
        <img src={logo} alt="" width="100%" height="100%" />
      </div>
      <div className={classes.titleBox}>{title}</div>
      <div className={classes.subTitleBox}>{subTitle}</div>
      <Link to={link}>
        <Button className={classes.btn}>
          <span className={classes.btnLabel}>C&lsquo;est parti</span>
        </Button>
      </Link>
    </div>
  );
};

export default Box;
