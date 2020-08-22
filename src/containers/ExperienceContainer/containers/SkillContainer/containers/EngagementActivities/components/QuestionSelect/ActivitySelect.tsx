import React, { useState, useEffect } from 'react';
import { Question } from 'requests/types';
import Select from 'components/Select/Select';
import { useOptions, useAddOption } from 'requests/options';
import useStyles from './styles';

interface Props {
  question: Question;
  onChange?: (event: React.ChangeEvent<{ name?: string; value: unknown }>, child: React.ReactNode) => void;
  open: boolean;
  value: string;
  openActivity: () => void;
  setOpen: (open: boolean) => void;
  parent?: string;
}
const ActivitySelect = ({
 question, onChange, open, value, openActivity, setOpen, parent,
}: Props) => {
  const classes = useStyles();
  const { data: dataOption, refetch } = useOptions({ variables: { question: question.id, parent } });
  const [addValue, setAddValue] = useState('');
  const [addActivityOptionCall, addActivityOptionState] = useAddOption();

  const options = dataOption
    ? dataOption.options.data.map((option) => ({ value: option.id, label: option.title }))
    : [];

  useEffect(() => {
    if (addActivityOptionState.data) refetch();
    setAddValue('');
  }, [addActivityOptionState.data, refetch]);

  const handleClose = (id: string) => {
    if (addValue.length > 2) {
      addActivityOptionCall({
        variables: { title: addValue, parent: parent ? [parent.split(',')] : [], question: id },
      });
      setOpen(false);
    }
  };
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueOption = e.target.value;
    setAddValue(valueOption);
  };
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
