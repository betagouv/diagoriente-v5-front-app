import React from 'react';

import Select from 'components/Select/Select';
import classNames from 'utils/classNames';
import moment from 'moment';
import arrow from 'assets/svg/whitearrow.svg';
import useStyles from './styles';
import 'moment/locale/fr';

interface Props {
  handleChange: (e: any) => void;
  day?: string | number;
  month?: string | number;
  year?: string | number;
  days: any;
  months: any;
  years: any;
}
moment.locale('fr');
const DatePicker = ({
 handleChange, day, month, year, days, months, years,
}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Select
        onChange={(e) => handleChange(`${year}-${month}-${e.target.value}`)}
        value={day}
        options={days}
        className={classNames(classes.selectContainer, classes.day)}
        arrowDate={arrow}
        disabledClassName={classes.disabledClassName}
        menuItemClassName={classes.menuItemClassName}
      />
      <Select
        onChange={(e) => handleChange(`${year}-${e.target.value}-${day}`)}
        value={month}
        options={months}
        className={classNames(classes.selectContainer, classes.month)}
        arrowDate={arrow}
        disabledClassName={classes.disabledClassName}
        menuItemClassName={classes.menuItemClassName}
      />
      <Select
        value={year}
        options={years}
        onChange={(e) => handleChange(`${e.target.value}-${month}-${day}`)}
        className={classNames(classes.selectContainer, classes.year)}
        arrowDate={arrow}
        disabledClassName={classes.disabledClassName}
        menuItemClassName={classes.menuItemClassName}
      />
    </div>
  );
};
DatePicker.defaultProps = {
  days: [...new Array(31)].map((el, index) => ({
    value: index + 1 < 10 ? `0${index + 1}` : String(index + 1),
    label: index + 1,
  })),
  years: [...new Array(101)].map((el, index) => ({
    value: moment().year() - 100 + index,
    label: moment().year() - 100 + index,
  })),
  months: moment.months().map((month, index) => ({
    value: index + 1 < 10 ? `0${index + 1}` : String(index + 1),
    label: month[0].toUpperCase() + month.slice(1),
  })),
};
export default DatePicker;
