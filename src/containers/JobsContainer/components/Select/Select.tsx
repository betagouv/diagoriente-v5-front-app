import React, { ReactElement } from 'react';
import Arrow from 'assets/svg/arrow';
import Menu from 'assets/svg/Group.svg';
import classNames from 'utils/classNames';
import { useTheme } from '@material-ui/core';
import OptionList from '../optionsList/OptionsList';
import useStyles from './styles';

interface IProps {
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectText: (e: string | undefined) => void;
  value?: string[] | undefined;
  name?: string;
  placeholder?: string;
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
  reference?: any;
  small?: boolean;
  parcourAcc?: { id: string };
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
  reference,
  parcourAcc,
}: IProps) => {
  const classes = useStyles({ fullSelect, open });
  const isInclude = (id: string) => value && value.includes(id);
  const theme = useTheme();
  return (
    <div className={classes.content} ref={reference}>
      <div className={classes.inputWrapper} onClick={onClick}>
        {fullSelect && (
          <div className={classes.menu}>
            <img src={Menu} alt="menu" />
          </div>
        )}
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
          {fullSelect ? (
            <div className={classes.secteurContainer}>
              {options?.map((el) => (
                <div
                  key={el.title}
                  className={classNames(classes.itemSecteur, isInclude(el.id) && classes.itemSecteurSelected)}
                  onClick={() => onSelectText(el.id)}
                >
                  <span className={classNames(classes.item, isInclude(el.id) && classes.selected)}>{el.title}</span>
                </div>
              ))}
            </div>
          ) : (
            <OptionList
              options={options}
              onSelectText={onSelectText}
              selected={value}
              name={name}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SelectJobs;
