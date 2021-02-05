import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: ' center',
    },
    labelContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: '100%',
    },
    label: {
      fontWeight: 'bold',
      fontSize: 16,
      color: 'black',
      marginRight: 18,
    },
    requiredInput: {
      color: theme.palette.success.main,
    },
    textField: {
      width: 235,
      borderTop: '1px solid rgb(201, 201, 199)',
      borderLeft: '1px solid rgb(201, 201, 199)',
      borderRight: '1px solid rgb(201, 201, 199)',
      backgroundColor: 'white',
      borderRadius: 5,
    },
  }));
interface IProps {
  onChangeDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  date: string;
  label: string;
}

export default function DatePickers({ onChangeDate, date, label }: IProps) {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={4} md={5} lg={5}>
          <div className={classes.labelContainer}>
            <label className={classes.label}>
              {label}
              <span className={classes.requiredInput}>*</span>
            </label>
          </div>
        </Grid>
        <Grid item xs={12} sm={8} md={7} lg={7}>
          <TextField
            id="date"
            type="date"
            name="date"
            defaultValue="2017-05-24"
            value={date}
            className={classes.textField}
            onChange={onChangeDate}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </form>
  );
}
