import React, { useRef } from 'react';
import logo from 'assets/svg/arrowSelect.svg';
import useOnclickOutside from 'hooks/useOnclickOutside';
import classNames from 'utils/classNames';

import useStyles from './styles';

const NativeSelects = () => {
  const p = process.env.REACT_APP_PUBLIC_URL;

  const classes = useStyles();
  const [page, setPage] = React.useState('Votre public');
  const [open, setOpen] = React.useState(false);
  const divSelect = useRef<HTMLDivElement>(null);
  const onOpenSelect = () => {
    setOpen(!open);
  };
  const option = [
    { label: "Accompagnement vers l'emploi", path: `${p}/emploi/` },
    { label: 'Education nationale', path: `${p}/education/` },
    { label: 'Volontariat', path: `${p}/volontariat/` },
  ];

  const handleChange = (event: any, e: string) => {
    // event.stopPropagation();
    // event.preventDefault();
    setPage(e);
    setOpen(false);
  };
  useOnclickOutside(divSelect, () => {
    if (open) {
      setOpen(false);
    }
  });
  return (
    <div className={classes.selectWrapper}>
      <div className={classes.selectContainer} onClick={onOpenSelect}>
        <span className={classes.textSelect}>{page}</span>
        <div>
          <img src={logo} alt="arrow" className={classNames(open && classes.rotatedArrowContainer)} />
        </div>
      </div>
      {open && (
        <div className={classes.optionsSelect}>
          <div style={{ opacity: 0.5 }}>
            <span>Votre public</span>
          </div>

          {option.map((e) => (
            <a key={e.label} onClick={(event) => handleChange(event, e.label)} className={classes.link} href={e.path}>
              <div className={classes.item}>{e.label}</div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
export default NativeSelects;
