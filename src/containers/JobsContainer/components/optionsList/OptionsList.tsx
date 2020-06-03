import React from 'react';
import CheckBox from 'components/inputs/CheckBox/CheckBox';
import useStyles from './styles';

interface Props {
  options: string[] | undefined;
  onSelectText: (id: string) => void;
  selected: string;
}

const OptionsList = ({ options, onSelectText, selected }: Props) => {
  const classes = useStyles();
  const formattedData = options?.map((el: any) => ({ label: el && (el.title || el.name), id: el.id })) || [];
  return (
    <div className={classes.root}>
      {formattedData.map((el) => (
        <div key={el.label} className={classes.item} onClick={() => onSelectText(el.label)}>
          <CheckBox name={el.label} checked={selected === el.label} onChange={() => {}} color="#FFD382" />
          <div className={classes.itemText}>{el.label}</div>
        </div>
      ))}
    </div>
  );
};

export default OptionsList;
