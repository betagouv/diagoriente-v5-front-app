import React, { useRef } from 'react';

import CheckBox, { CheckboxProps } from '@material-ui/core/Checkbox/Checkbox';
import classNames from 'utils/classNames';

import useStyles from './styles';

interface AdminCheckbox extends CheckboxProps {
  label: string;
}

const AdminCheckbox = ({ label, className, ...rest }: AdminCheckbox) => {
  const classes = useStyles();
  const checkboxRef = useRef<HTMLInputElement>(null);

  return (
    <div className={classNames(classes.container, className)}>
      <CheckBox inputRef={checkboxRef} {...rest} />
      <span
        onClick={() => {
          if (checkboxRef.current) checkboxRef.current.click();
        }}
        className={classes.label}
      >
        {label}
      </span>
    </div>
  );
};

export default AdminCheckbox;
