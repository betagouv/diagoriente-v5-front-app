import React, { useEffect, useRef, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { THEME_TYPES_OPTIONS } from 'utils/generic';

import { useForm } from 'hooks/useInputs';
import { useActivities } from 'requests/activities';
import { useThemes } from 'requests/themes';
import { useCompetences } from 'requests/competences';
import { Theme } from 'requests/types';

import AdminTextField from 'components/inputs/AdminTextField/AdminTextField';
import AdminCheckBox from 'components/inputs/AdminCheckbox/AdminCheckbox';
import Button from '@material-ui/core/Button/Button';
import AdminSelect from 'components/inputs/AdminSelect/AdminSelect';
import AdminAutocomplete from 'components/inputs/AdminAutocomplete/AdminAutocomplete';
import AdminFileUpload from 'components/inputs/AdminFileUpload/AdminFileUpload';
import Tooltips from '../TooltipForm/TooltipeForm';

import useStyles from './styles';

interface ThemeFormValues {
  title?: string;
  description?: string;
  type?: string;
  verified?: boolean;
  activities?: string[];
  icon?: File;
  tooltips?: { competenceId: string; tooltip: string }[];
}

interface ThemeFormProps {
  onSubmit: (values: ThemeFormValues) => void;
  theme?: Theme;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const ThemeForm = ({ onSubmit, theme }: ThemeFormProps) => {
  const [value, setValue] = useState(0);
  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  const { data: secteurs } = useThemes({ variables: { type: 'secteur' }, fetchPolicy: 'network-only' });

  const [state, actions] = useForm({
    initialValues: {
      title: '',
      description: '',
      type: '',
      verified: false,
      activities: [] as { label: string; value: string }[],
      icon: undefined as File | undefined,
      parentId: '',
      tooltips: [] as { competenceId: string; tooltip: string }[],
    },
  });

  const { values } = state;
  useEffect(() => {});
  const { data: ListCompetence } = useCompetences({
    variables:
      theme?.type === 'engagement' || values.type === 'engagement' ? { type: 'engagement' } : { type: 'default' },
  });
  const classes = useStyles({ type: values.type });

  const { handleChange, setValues } = actions;
  const activitiesCapture = useRef(false);

  useEffect(() => {
    if (!activitiesCapture.current) {
      setValues({ activities: [] });
    } else {
      activitiesCapture.current = false;
    }
    // eslint-disable-next-line
  }, [values.type]);

  useEffect(() => {
    if (theme) {
      activitiesCapture.current = true;
      setValues({
        title: theme.title,
        description: theme.description || '',
        type: theme.type,
        verified: theme.verified,
        parentId: theme.parentId,
        activities: theme.activities
          ? theme.activities.map((activity) => ({
              label: activity.title,
              value: activity.id,
            }))
          : [],
      });
    }
    // eslint-disable-next-line
  }, [theme]);

  useEffect(() => {
    if (ListCompetence?.competences.data) {
      const res: { competenceId: string; tooltip: string }[] = [];
      if (theme?.tooltips.length !== 0) {
        ListCompetence?.competences.data?.map((competence) =>
          theme?.tooltips.find((t) => {
            if (t.competenceId.toString() === competence.id.toString()) {
              res.push({ competenceId: competence.id, tooltip: t.tooltip });
            }
          }),
        );
      } else {
        ListCompetence?.competences.data?.map((c) => res.push({ competenceId: c.id, tooltip: "" }));
      }
      setValues({ tooltips: res });
    }
  }, [ListCompetence]);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = { ...values, activities: values.activities.map((act) => act.value) };
    if (!data.icon || values.type === 'professional') delete data.icon;
    if (data.type === 'secteur') delete (data as any).activities;
    if (data.type === 'sport') delete (data as any).parentId;
    onSubmit(data);
  }
  const handleChangeTooltip = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) => {
    const { value } = e.target;
    const t = [...values.tooltips];
    t[i].tooltip = value;
    setValues({ tooltips: t });
  };
  return (
    <>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChangeTab} aria-label="simple tabs example">
          <Tab label="Theme Information" {...a11yProps(0)} />
          <Tab label="Tooltips" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <form onSubmit={handleSubmit} className={classes.wrapper}>
          <div className={classes.container}>
            <AdminTextField
              name="title"
              value={values.title}
              onChange={handleChange}
              label="Titre"
              color="primary"
              className={classes.title}
            />

            {values.type !== 'professional' ? (
              <AdminFileUpload
                defaultImage={theme?.resources?.icon || undefined}
                onChange={handleChange}
                name="icon"
                className={classes.icons}
                label="Icon"
              />
            ) : (
              <AdminSelect
                label="Parent"
                name="parentId"
                className={classes.secteur}
                value={values.parentId}
                onChange={handleChange}
                options={
                  secteurs ? secteurs.themes.data.map((secteur) => ({ value: secteur.id, label: secteur.title })) : []
                }
              />
            )}

            <AdminTextField
              name="description"
              value={values.description}
              onChange={handleChange}
              className={classes.description}
              multiline
              rows={6}
              label="Description"
              color="primary"
            />
            <AdminCheckBox
              name="verified"
              checked={values.verified}
              onChange={handleChange}
              className={classes.verified}
              label="Verified"
            />
            <AdminSelect
              name="type"
              value={values.type}
              onChange={handleChange}
              label="Type"
              options={THEME_TYPES_OPTIONS}
              className={classes.type}
              disabled={!!theme}
            />
            {values.type !== 'secteur' && (
              <AdminAutocomplete
                handleOptions={(activity) => ({ label: activity.title, value: activity.id })}
                value={values.activities}
                label="Activités"
                multiple
                list={useActivities}
                onChange={(e, value) => setValues({ activities: value })}
                className={classes.activities}
                variables={{ type: values.type }}
              />
            )}
          </div>
          <Button type="submit" className={classes.button} variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Tooltips
          theme={theme}
          list={ListCompetence?.competences.data}
          handleChangeTooltip={handleChangeTooltip}
          tooltips={values.tooltips}
          onSubmit={onSubmit}
        />
      </TabPanel>
    </>
  );
};

export default ThemeForm;
