import React, { ReactElement, forwardRef, useRef } from 'react';
import Arrow from 'assets/svg/arrow';
import Menu from 'assets/svg/Group.svg';
import classNames from 'utils/classNames';
import { useTheme } from '@material-ui/core';
import useCaptureRef from 'hooks/useCaptureRef';
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
  classNameInput?: string;
  errorForm?: string;
  open?: boolean;
  onClick: () => void;
  fullSelect?: boolean;
  loading?: boolean;
  reference?: any;
  small?: boolean;
  parcourAcc?: { id: string };
  isCampus?: boolean;
  isCampusDiplome?: boolean;
  colorArrow?: string;
}

const SelectJobs = forwardRef<HTMLDivElement, IProps>(
  (
    {
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
      isCampus,
      isCampusDiplome,
      parcourAcc,
      classNameInput,
      colorArrow,
      ...rest
    }: IProps,
    Ref,
  ) => {
    const classes = useStyles({ fullSelect, open });
    const containerRef = useRef<HTMLDivElement>(null);
    const isInclude = (id: string) => value && value.includes(id);
    const theme = useTheme();
    useCaptureRef(containerRef.current, Ref);
    useCaptureRef(containerRef.current, reference);
    const hasOne = (value && isCampus) || (value && isCampusDiplome) ? value[0] : '';
    return (
      <div className={classes.content} ref={containerRef}>
        <div className={classes.inputWrapper} onClick={onClick} {...rest}>
          {fullSelect && (
            <div className={classes.menu}>
              <img src={Menu} alt="menu" />
            </div>
          )}
          <input
            onChange={onChange}
            name={name}
            placeholder={placeholder}
            className={classNames(classes.inputContainer, classNameInput)}
            disabled
            value={hasOne}
          />
          <div className={classes.logoContainer}>
            <Arrow
              color={colorArrow || theme.palette.success.main}
              width="20"
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
                isCampus={isCampus}
                isCampusDiplome={isCampusDiplome}
              />
            )}
          </div>
        )}
      </div>
    );
  },
);

export default SelectJobs;
