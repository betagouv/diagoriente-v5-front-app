import React from 'react';
import { Question } from 'requests/types';
import Select from 'components/Select/Select';
import { useOptions } from 'requests/options';

import useStyles from './styles';

interface Props {
  question: Question;
  onChange?: (event: React.ChangeEvent<{ name?: string; value: unknown }>, child: React.ReactNode) => void;
  handleClose: (id: string) => void;
  onChangeValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  open: boolean;
  value: string;
  openActivity: () => void;
  setOpen: (open: boolean) => void;
  parent?: string;
}
const ActivitySelect = ({
  question,
  onChange,
  handleClose,
  onChangeValue,
  open,
  value,
  openActivity,
  setOpen,
  parent,
}: Props) => {
  const classes = useStyles();
  const { data: dataOption } = useOptions({ variables: { question: question.id, parent } });

  const options = dataOption
    ? dataOption.options.data.map((option) => ({ value: option.id, label: option.title }))
    : [];

  return (
    <Select
      label={question.title}
      value={value}
      onChange={onChange}
      options={options}
      open={open}
      openActivity={openActivity}
      setOpen={setOpen}
      handleClose={() => handleClose(question.id)}
      onChangeValue={onChangeValue}
      rootClassName={classes.rootClassName}
      styleSelectClassName={classes.styleSelect}
      className={classes.borderSelect}
    />
  );
};

export default ActivitySelect;
