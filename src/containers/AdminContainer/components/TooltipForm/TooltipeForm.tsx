import React from 'react';
import AdminTextField from 'components/inputs/AdminTextField/AdminTextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button/Button';
import { Theme } from 'requests/types';
import useStyles from './stylesTooltip';

interface ThemeTooltipValues {
  tooltips?: { competenceId: string; tooltip: string }[];
}

interface IProps {
  theme: Theme | undefined;
  list: any[] | undefined;
  tooltips: { competenceId: string; tooltip: string }[];
  onSubmit: (values: ThemeTooltipValues) => void;
  handleChangeTooltip: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) => void;
}

const TooltipeForm = ({ theme, list, handleChangeTooltip, tooltips, onSubmit }: IProps) => {
  const classes = useStyles();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (theme?.id) {
      onSubmit({ tooltips });
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      {list?.map((c, i) => (
        <Grid container spacing={0}>
          <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <Grid item xs={12} sm={4} md={5} lg={5}>
              <div className={classes.rowWrapper}>
                <span>{c.title}</span>
              </div>
            </Grid>
            <Grid item xs={12} sm={4} md={5} lg={5}>
              <AdminTextField
                name={tooltips[i]?.tooltip}
                value={tooltips[i]?.tooltip}
                onChange={(e) => handleChangeTooltip(e, i)}
                label=""
                color="primary"
              />
            </Grid>
          </div>
        </Grid>
      ))}
      <div className={classes.btnContainer}>
        <Button type="submit" className={classes.button} variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
};
export default TooltipeForm;
