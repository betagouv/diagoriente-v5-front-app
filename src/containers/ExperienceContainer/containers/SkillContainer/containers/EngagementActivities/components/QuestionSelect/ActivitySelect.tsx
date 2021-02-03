import React, {
 useState, useEffect, useContext, useMemo,
} from 'react';
import { Question, Option } from 'requests/types';
import Select from 'components/Select/Select';
import { useOptions, useAddOption, useDeleteOption } from 'requests/options';
import Remove from '@material-ui/icons/DeleteForever';
import UserContext from 'contexts/UserContext';

import useStyles from './styles';

interface Props {
  question: Question;
  onChange?: (option: Option) => void;
  open: boolean;
  value: string;
  openActivity: () => void;
  setOpen: (open: boolean) => void;
  parent?: string;
  index?: number;
}
const ActivitySelect = ({
 question, onChange, open, value, openActivity, setOpen, parent, index,
}: Props) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const ownOption = (id: string) => {
    const res = user?.id === id;
    return res;
  };

  const { data: dataOption, refetch } = useOptions({ variables: { question: question.id, parent } });
  const [addValue, setAddValue] = useState('');
  const [addActivityOptionCall, addActivityOptionState] = useAddOption();
  const [deleteOptionCall, deleteOptionState] = useDeleteOption();

  const options = useMemo(
    () => (dataOption ? dataOption.options.data.map((option) => ({ value: option.id, label: option.title })) : []),
    [dataOption],
  );
  const handleClose = (id: string) => {
    if (addValue.length > 2) {
      addActivityOptionCall({
        variables: { title: addValue, parent: parent ? [parent.split(',')] : [], question: id },
      });
      setOpen(false);
    }
  };
  useEffect(() => {
    if (deleteOptionState.data) {
      refetch();
    }
  }, [deleteOptionState.data, refetch, onChange, options]);

  useEffect(() => {
    if (addActivityOptionState.data) {
      refetch();
      if (onChange && addActivityOptionState.data?.addOption) {
        onChange(addActivityOptionState.data?.addOption);
        setOpen(false);
      }
    }
    setAddValue('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addActivityOptionState.data, refetch, setOpen]);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueOption = e.target.value;
    setAddValue(valueOption);
  };

  const handleChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    const option = dataOption?.options.data.find((o) => o.id === e.target.value);
    if (option && onChange) onChange(option);
  };
  const onDeleteOption = (id: string) => {
    deleteOptionCall({
      variables: { id },
    });
  };
  const renderOption = (option: { label: string | number; value: string | number }, openSelect: boolean) => {
    const optionUser = dataOption?.options.data.find((o) => o.id === option.value)?.user;
    return (
      <div className={classes.menuItemContainer}>
        {option.label}
        {optionUser && ownOption(optionUser) && openSelect && (
          <Remove
            className={classes.deleteIcon}
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              onDeleteOption(option.value as string);
            }}
          />
        )}
      </div>
    );
  };
  return (
    <Select
      index={index}
      label={question.title}
      value={value}
      onChange={handleChange}
      options={options}
      open={open}
      openActivity={openActivity}
      setOpen={setOpen}
      handleClose={() => handleClose(question.id)}
      onChangeValue={onChangeValue}
      rootClassName={classes.rootClassName}
      styleSelectClassName={classes.styleSelect}
      className={classes.borderSelect}
      renderOption={renderOption}
    />
  );
};

export default ActivitySelect;
