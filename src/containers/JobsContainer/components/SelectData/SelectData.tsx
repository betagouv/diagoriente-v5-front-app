import React, { ReactElement } from 'react';
import Arrow from 'assets/svg/arrow';
import classNames from 'utils/classNames';
import { useTheme } from '@material-ui/core';
import useStyles from './style';

interface IProps {
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectText: (e: number | undefined) => void;
  value?: number | undefined;
  name?: string;
  placeholder?: string;
  options: number[] | undefined;
  icon?: ReactElement;
  className?: string;
  open?: boolean;
  onClick: () => void;
  loading?: boolean;
  reference?: any;
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
  reference,
}: IProps) => {
  const classes = useStyles({ open });
  const theme = useTheme();
  return (
    <div className={classes.content} ref={reference}>
      <div className={classes.inputWrapper} onClick={onClick}>
        <input onChange={onChange} name={name} placeholder={placeholder} className={classes.inputContainer} disabled />
        <div className={classes.logoContainer}>
          <Arrow
            color={theme.palette.success.main}
            width="9"
            height="14"
            className={open ? classes.rotatedBase : classes.rotated}
          />
        </div>
      </div>
      {open && (
        <div className={classes.optionsContainer}>
          <div className={classes.secteurContainer}>
            {options?.map((el) => (
              <div key={el} className={classNames(classes.itemSecteur)} onClick={() => onSelectText(el)}>
                <span className={classNames(classes.item && classes.selected)}>{el}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectJobs;
