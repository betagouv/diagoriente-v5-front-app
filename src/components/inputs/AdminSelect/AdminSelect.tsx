import React, { useRef, useState, useEffect } from 'react';

import classNames from 'utils/classNames';

import Select, { SelectProps } from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Label from '../Label/Label';

import useStyles from './styles';

export interface Option {
  value: string;
  label: string;
}

interface AdminSelectProps
  extends Omit<SelectProps, 'value' | 'onChange' | 'variant' | 'error' | 'open' | 'onOpen' | 'onClose' | 'MenuProps'> {
  label?: string;
  options: Option[];
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<{ name?: string; value: string }>) => void;
  selectClassName?: string;
}
const AdminSelect = ({
 label, className, options, selectClassName, error, ...rest
}: AdminSelectProps) => {
  const [open, setOpen] = useState(false);
  const [rects, setRects] = useState({ width: 0 });

  const classes = useStyles();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const { width } = ref.current.getBoundingClientRect();
      setRects({ width });
    }
  }, [open]);
  return (
    <div ref={ref} className={classNames(classes.container, className)}>
      {label && <Label>{label}</Label>}
      <Select
        {...(rest as any)}
        className={selectClassName}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        MenuProps={{
          PaperProps: { style: { minWidth: rects.width }, className: classes.paper },
        }}
        variant="outlined"
        error={!!error}
      >
        <MenuItem value="">Choisir ...</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <span className={classes.error}>{error}</span>}
    </div>
  );
};

export default AdminSelect;
