import React, { ReactElement } from 'react';
import TextField from 'components/inputs/Input/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import LogoLoupe from 'assets/svg/loupe.svg';
import LogoLoupeComponent from 'assets/svg/loupe';
import LogoLoupeOrange from 'assets/svg/loupeOrange.svg';
import classNames from 'utils/classNames';

import useStyles from './style';

interface IProps {
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectText: (e: string | undefined) => void;
  value: string;
  name: string;
  placeholder?: string;
  error?: boolean;
  errorText?: string;
  options: any;
  icon?: ReactElement;
  className?: string;
  errorForm?: string;
  open?: boolean;
}

const AutoCompleteJob = ({
  label,
  onChange,
  value,
  name,
  placeholder,
  errorText,
  options,
  errorForm,
  open,
  onSelectText,
}: IProps) => {
  const classes = useStyles({ error: !!(errorText || errorForm) });
  return (
    <div className={classes.root}>
      <TextField
        onChange={onChange}
        value={value || ''}
        placeholder={placeholder}
        label={label}
        name={name}
        withOutIcons
        InputProps={{
          classes: { input: classNames(classes.inputRoot), root: classes.inputBase },
          startAdornment: (
            <InputAdornment position="start">
              <img src={open ? LogoLoupeOrange : LogoLoupe} width="19" height="19" alt="" />
            </InputAdornment>
          ),
        }}
      />
      {open && (
        <div className={classes.optionsContainer}>
          {options.map((el: any) => {
            const t = el.title.toLowerCase().split(value.toLowerCase());
            for (let i = 0; i < t.length; i += 1) {
              return (
                <div
                  key={el.id}
                  onClick={() => {
                    onSelectText(el.title);
                  }}
                  className={classes.item}
                >
                  <LogoLoupeComponent color="#424242" width="19" height="19" />
                  <div className={classes.itemWrapper}>
                    <span>{t[i]}</span>
                    <span style={{ fontWeight: 'bold' }}>{value}</span>
                    {t[i + 1] && <span>{t[i + 1]}</span>}
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default AutoCompleteJob;
