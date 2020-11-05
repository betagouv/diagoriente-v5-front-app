import React, { useRef } from 'react';
import TextField from 'components/inputs/Input/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import LogoLoupe from 'assets/svg/loupe.svg';
import LogoLoupeComponent from 'assets/svg/loupe';
import LogoLoupeOrange from 'assets/svg/loupeOrange.svg';
import classNames from 'utils/classNames';
import useOnclickOutside from 'hooks/useOnclickOutside';

import useStyles from './style';

interface IProps {
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectText: (e: string | undefined) => void;
  value: string | undefined;
  name: string;
  placeholder?: string;
  error?: boolean;
  errorText?: string;
  options: any;
  icon?: any;
  className?: string;
  errorForm?: string;
  open?: boolean;
  type?: string;
  isfull?: boolean;
  setOpen?: (open: boolean) => void;
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
  type,
  error,
  className,
  onSelectText,
  setOpen,
  isfull,
}: IProps) => {
  const classes = useStyles({ error: !!(errorText || errorForm), isfull });
  const data = options?.map((el: any) => ({
    label: el.title || el.label,
    value: type === 'immersion' ? el.rome_codes : el,
  }));
  const inputRef = useRef<HTMLDivElement>(null);

  useOnclickOutside(inputRef, () => {
    if (setOpen) setOpen(false);
  });

  return (
    <div className={classNames(classes.root, className)} ref={inputRef}>
      <TextField
        autoComplete="off"
        autoCorrect="off"
        error={error}
        onChange={onChange}
        value={value || ''}
        placeholder={placeholder}
        label={label}
        name={name}
        withOutIcons
        type="location_admin"
        isfull
        InputProps={{
          classes: { input: classNames(classes.inputRoot, className), root: classNames(classes.inputBase, className) },
          startAdornment:
            type === 'location' || type === 'jobs' || type === 'location_admin' ? (
              <InputAdornment position="start">
                <img src={open ? LogoLoupeOrange : LogoLoupe} width="19" height="19" alt="" />
              </InputAdornment>
            ) : (
              <div />
            ),
        }}
      />
      {open && (
        <div className={classes.optionsContainer}>
          {data?.map((el: any) => {
            const t = el.label.toLowerCase().split(value?.toLowerCase());
            for (let i = 0; i < t.length; i += 1) {
              return (
                <div
                  key={el.label}
                  onClick={() => {
                    onSelectText(el);
                  }}
                  className={classes.item}
                >
                  {type === 'jobs' && <LogoLoupeComponent color="#424242" width="19" height="19" />}
                  {type === 'jobs' ? (
                    <div className={classes.itemWrapper}>
                      <span>{t[i]}</span>
                      <span style={{ fontWeight: 'bold' }}>{value}</span>
                      {t[i + 1] && <span>{t[i + 1]}</span>}
                    </div>
                  ) : (
                    <div>{el.label}</div>
                  )}
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
