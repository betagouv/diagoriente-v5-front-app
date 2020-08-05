import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Activity, Theme } from 'requests/types';

import TitleImage from 'components/common/TitleImage/TitleImage';
import Title from 'components/common/Title/Title';
import NextButton from 'components/nextButton/nextButton';
import CancelButton from 'components/cancelButton/CancelButton';
import Select from 'components/Select/Select';

import RestLogo from 'components/common/Rest/Rest';

import blueline from 'assets/svg/blueline.svg';

import useStyles from './styles';

interface Props extends RouteComponentProps<{ themeId: string }> {
  theme: Theme;
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
  isCreate?: boolean;
}
const values = [
  { value: '1', label: ' Jencadre ?' },
  { value: '4', label: ' Jencdssfsdfsffsfsfsfadre ?' },
  { value: '5', label: ' Jeddkdkdkdkdkkdkdkdkdkdkncadre ?' },
];
const B = [{ value: '2', label: 'Avec qui ? ' }];
const C = [{ value: '3', label: 'Dans quel contexte ? ' }];
const EngagementActivities = ({ history, match, theme, isCreate, location }: Props) => {
  const classes = useStyles();
  const [data, setData] = useState('');
  const [open, setOpen] = useState(false);
  const [addValue, setAddValue] = useState('');

  const handleChange = (e: React.ChangeEvent<any>) => {
    setData(e.target.value);
  };

  const openActivity = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    values.push({ value: addValue, label: addValue });
  };

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAddValue(value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Title title={'MES EXPÉRIENCES D’ENGAGEMENT'} color="#223A7A" size={26} />
          <RestLogo
            onClick={() => {
              let path = '/experience';
              history.replace(path);
            }}
            color="#4D6EC5"
            label="Annuler"
          />
        </div>
        <div className={classes.themeContainer}>
          <TitleImage title="2." image={blueline} color="#223A7A" width={180} />
          <p className={classes.title}>
            Peux-tu nous en dire un peu plus sur
            <br />
            <strong>les activités </strong>
            que tu pratiques ?
            <br />
          </p>
          <div className={classes.selectRoot}>
            <div>
              <span>Choisis en déroulant les menus ou ajoute tes propre activités</span>
              <div className={classes.selectContainer}>
                <Select
                  label="Ton action ? "
                  value={data}
                  onChange={handleChange}
                  options={values}
                  open={open}
                  openActivity={openActivity}
                  setOpen={setOpen}
                  handleClose={handleClose}
                  onChangeValue={onChangeValue}
                  rootClassName={classes.rootClassName}
                />
                <Select
                  label="Avec qui ? "
                  value={data}
                  onChange={handleChange}
                  options={B}
                  open={open}
                  openActivity={openActivity}
                  setOpen={setOpen}
                  handleClose={handleClose}
                  onChangeValue={onChangeValue}
                  rootClassName={classes.rootClassName}
                />
                <Select
                  label="Dans quel contexte ?"
                  value={data}
                  onChange={handleChange}
                  options={C}
                  open={open}
                  openActivity={openActivity}
                  setOpen={setOpen}
                  handleClose={handleClose}
                  onChangeValue={onChangeValue}
                  rootClassName={classes.rootClassName}
                />
                <Select
                  label="Dans quel contexte ?"
                  value={data}
                  onChange={handleChange}
                  options={C}
                  open={open}
                  openActivity={openActivity}
                  setOpen={setOpen}
                  handleClose={handleClose}
                  onChangeValue={onChangeValue}
                  rootClassName={classes.rootClassName}
                />
                <Select
                  label="Dans quel contexte ?"
                  value={data}
                  onChange={handleChange}
                  options={C}
                  open={open}
                  openActivity={openActivity}
                  setOpen={setOpen}
                  handleClose={handleClose}
                  onChangeValue={onChangeValue}
                  rootClassName={classes.rootClassName}
                />
              </div>
            </div>
          </div>
          <Link
            to={`/experience/skill/${match.params.themeId}/competences${location.search}`}
            className={classes.hideLine}
          >
            <NextButton />
          </Link>
        </div>
        {isCreate && (
          <Link
            to={`/experience/${theme.type === 'engagement' ? 'theme?type=engagement' : 'theme'}${location.search}`}
            className={classes.btnpreced}
          >
            <CancelButton />
            Précedent
          </Link>
        )}
      </div>
    </div>
  );
};
export default EngagementActivities;
