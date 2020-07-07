import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import check from 'assets/svg/check.svg';
import cancel from 'assets/svg/cancel.svg';

import classNames from 'utils/classNames';

export interface Props {
  className?: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 18,
    height: 18,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto #fe5',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#fff',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 18,
      height: 18,
      backgroundImage: 'radial-gradient(#00B2DB,#00B2DB 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#fff',
    },
  },
});

function StyledRadio(props: RadioProps) {
  const classes = useStyles();
  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={classNames(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
      onChange={(e) => {
      }}
    />
  );
}

export default function RadioButton({ onChange, value }: Props) {
  return (
    <RadioGroup
      onChange={onChange as any}
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
    >
      <FormControlLabel value="Oui" control={<StyledRadio  />} label="Oui" />
      <img src={check} alt="check" height={11} style={{ marginRight: 40 }} />

      <FormControlLabel value="Non" control={<StyledRadio />} label="Non" />
      <img src={cancel} alt="cancel" height={11} />
    </RadioGroup>
  );
}
