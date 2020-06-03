import React, { ReactElement } from 'react';
import Arrow from 'assets/svg/arrow';
import Menu from 'assets/svg/Group.svg';
import OptionList from '../optionsList/OptionsList';

import useStyles from './styles';

interface IProps {
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectText: (e: string | undefined) => void;
  value: string;
  name: string;
  placeholder: string;
  error?: boolean;
  errorText?: string;
  options: any[] | undefined;
  icon?: ReactElement;
  className?: string;
  errorForm?: string;
  open?: boolean;
  onClick: () => void;
  fullSelect?: boolean;
  loading?: boolean;
}

const SelectJobs = ({
  onChange,
  value,
  name,
  placeholder,
  options,
  open,
  onSelectText,
  onClick,
  fullSelect,
}: IProps) => {
  const classes = useStyles({ fullSelect, open });
  return (
    <div onClick={onClick} className={classes.content}>
      <div className={classes.inputWrapper}>
        {fullSelect && (
          <div className={classes.menu}>
            <img src={Menu} alt="menu" />
          </div>
        )}
        <input
          onChange={onChange}
          value={value}
          name={name}
          placeholder={placeholder}
          className={classes.inputContainer}
          disabled
        />
        <div className={classes.logoContainer}>
          <Arrow color="#DB8F00" width="9" height="14" className={open ? classes.rotatedBase : classes.rotated} />
        </div>
      </div>
      {open && (
        <div className={classes.optionsContainer}>
          {fullSelect ? <div /> : <OptionList options={options} onSelectText={onSelectText} selected={value} />}
        </div>
      )}
    </div>
  );
};

export default SelectJobs;
