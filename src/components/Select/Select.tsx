import React, { useState, useRef, useEffect } from 'react';
import SelectBase, { SelectProps } from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Input from '@material-ui/core/TextField/TextField';
import { useListener } from 'hooks/useListener';

import classNames from 'utils/classNames';
import useOnclickOutside from 'hooks/useOnclickOutside';
import arrow from 'assets/svg/arrowblue.svg';
import darkarrow from 'assets/svg/darkarrowblue.svg';

import add from 'assets/svg/pictoadd.svg';
import check from 'assets/svg/pictocheck.svg';

import useStyles from './styles';

interface Props extends Omit<SelectProps, 'variant'> {
  label?: string;
  options: { label: string | number; value: string | number }[];
  className?: string;
  openActivity?: () => void;
  open?: boolean;
  setOpen?: any;
  handleClose?: () => void;
  onChangeValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  arrowDate?: string;
  inputBase?: string;
  menuClassName?: string;
  rootClassName?: string;
  menuItemClassName?: string;
  styleSelectClassName?: string;
  disabledClassName?: string;
  value?: string | number;
}

const Select = ({
  label,
  className,
  options,
  openActivity,
  open,
  value,
  setOpen,
  handleClose,
  onChangeValue,
  arrowDate,
  inputBase,
  menuClassName,
  rootClassName,
  menuItemClassName,
  styleSelectClassName,
  disabledClassName,
  ...rest
}: Props) => {
  const [openSelect, setOpenSelect] = useState(false);

  const [dimension, setDimension] = useState([] as number[]);

  const menuRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState('auto' as number | string);
  const classes = useStyles({ left: dimension[0], top: dimension[1], width });
  useOnclickOutside(menuRef, () => {
    if (setOpenSelect) setOpenSelect(false);
  });

  const selectClose = () => {
    if (setOpenSelect) setOpenSelect(false);
  };

  useEffect(() => {
    if (selectRef.current && openSelect) {
      const { top, left, height } = selectRef.current?.getBoundingClientRect();
      setDimension([left, top + height + 8]);
    }
  }, [openSelect]);

  useEffect(() => {
    if (selectRef.current) {
      const { width: w } = selectRef.current?.getBoundingClientRect();
      setWidth(w);
    }
  }, []);

  useListener('resize', () => {
    if (selectRef.current && openSelect) {
      const {
 top, left, height, width: w,
} = selectRef.current?.getBoundingClientRect();
      setDimension([left, top + height + 8]);
      setWidth(w);
    }
  });

  useEffect(() => {
    if (!openSelect && setOpen) setOpen(false);
    // eslint-disable-next-line
  }, [openSelect]);

  const getValue = () => {
    if (width === 'auto') return '__label__';
    return value || '__label__';
  };

  return (
    <div className={classNames(classes.root, rootClassName)}>
      <SelectBase
        style={{ width }}
        value={getValue()}
        ref={selectRef}
        MenuProps={{
          classes: { paper: classNames(classes.menu, menuClassName), list: classes.paddingBottom },
          PaperProps: { ref: menuRef },
        }}
        classes={{
          selectMenu: classes.selectMenu,
          disabled: classes.disabled,
          root: classes.rootBackground,
        }}
        className={classNames(
          classes.selectContainer,
          className,
          !arrowDate && classes.padding,
          value && styleSelectClassName,
        )}
        IconComponent={() =>
          (!arrowDate ? (
            <div
              className={classNames(classes.circle, openSelect && classes.darkcircle)}
              onClick={() => {
                setOpenSelect(true);
              }}
            >
              <img src={openSelect ? darkarrow : arrow} alt="" className={classes.img} />
            </div>
          ) : (
            <div
              className={classes.arrowDate}
              onClick={() => {
                setOpenSelect(true);
              }}
            >
              <img src={arrowDate} alt="" />
            </div>
          ))}
        inputProps={{
          classes: {
            root: classes.select,
          },
        }}
        placeholder="Sélectionner"
        {...rest}
        variant="outlined"
        onClose={() => {}}
        onOpen={() => {
          setOpenSelect(true);
        }}
        open={openSelect}
      >
        <MenuItem onClick={selectClose} value="__label__" disabled className={disabledClassName}>
          {label}
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem
            onClick={selectClose}
            key={option.value}
            value={option.value}
            className={classNames(
              classes.menuItem,
              menuItemClassName,
              index === options.length - 1 && open && classes.lastChildBorder,
              option.value === value ? classes.backgroundRow : '',
            )}
          >
            {option.label}
          </MenuItem>
        ))}
        {!arrowDate ? (
          <MenuItem className={classes.menuItem}>
            {!open ? (
              <div onClick={openActivity} className={classes.addContainer}>
                <span className={classes.add}>Ajouter</span>
                <img src={add} alt="" height={28} />
              </div>
            ) : (
              <div className={classNames(classes.addContainerInput, classes.menuItemBackground)}>
                <Input
                  placeholder="Écris ici ton activité"
                  onChange={onChangeValue}
                  variant="outlined"
                  inputProps={{ className: classes.input }}
                  className={classes.inputRoot}
                  onKeyDown={(e) => e.stopPropagation()}
                />
                <img src={check} alt="" onClick={handleClose} height={25} />
              </div>
            )}
          </MenuItem>
        ) : (
          undefined
        )}
      </SelectBase>
    </div>
  );
};

export default Select;
