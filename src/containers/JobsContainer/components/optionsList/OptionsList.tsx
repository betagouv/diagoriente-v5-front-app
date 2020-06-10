import React from 'react';
import CheckBox from 'components/inputs/CheckBox/CheckBox';
import useStyles from './styles';

interface Props {
  name: string;
  options: string[] | undefined;
  onSelectText: (id: string) => void;
  selected: string[] | undefined;
}

const OptionsList = ({ options, onSelectText, selected, name }: Props) => {
  const classes = useStyles();
  const formattedData = options?.map((el: any) => ({ label: el && (el.title || el.name), id: el.id })) || [];
  const isInclude = (id: string) => selected && selected.includes(id);
  return (
    <div className={classes.root}>
      {formattedData.map((el) => (
        <div
          key={el.label}
          className={classes.item}
          onClick={() => onSelectText(name === 'accessibility' ? el.label : el.id)}
        >
          <CheckBox name={el.label} checked={isInclude(el.id)} onChange={() => {}} color="#FFD382" />
          <div className={classes.itemText}>{el.label}</div>
        </div>
      ))}
    </div>
  );
};

export default OptionsList;
