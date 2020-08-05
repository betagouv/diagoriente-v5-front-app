import React, { useState } from 'react';

import Select from 'components/Select/Select';
import classNames from 'utils/classNames';
import moment from 'moment';
import arrow from 'assets/svg/whitearrow.svg';
import useStyles from './styles';
import 'moment/locale/fr';

interface Props {
  handleChange: (e: React.ChangeEvent<any>, type: 'day' | 'month' | 'year') => void;
  day?: string | number;
  month?: string | number;
  year?: string | number;
}
moment.locale('fr');
const days = [...new Array(31)].map((el, index) => ({ value: index + 1, label: index + 1 }));
const years = [...new Array(201)].map((el, index) => ({
  value: moment().year() - 101 + index,
  label: moment().year() - 101 + index,
}));
const months = moment
  .months()
  .map((month, index) => ({ value: index + 1, label: month[0].toUpperCase() + month.slice(1) }));
const DatePicker = ({ handleChange, day, month, year }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Select
        onChange={(e) => handleChange(e, 'day')}
        value={day}
        options={days}
        className={classNames(classes.selectContainer, classes.day)}
        arrowDate={arrow}
      />
      <Select
        onChange={(e) => handleChange(e, 'month')}
        value={month}
        options={months}
        className={classNames(classes.selectContainer, classes.month)}
        arrowDate={arrow}
      />
      <Select
        value={year}
        options={years}
        onChange={(e) => handleChange(e, 'year')}
        className={classNames(classes.selectContainer, classes.year)}
        arrowDate={arrow}
      />
    </div>
  );
};

export default DatePicker;
