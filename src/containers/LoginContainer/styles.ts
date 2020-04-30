import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    width: '60%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    margin: '10px 0',
  },
  errorText: {
    color: theme.palette.error.main,
    fontSize: 12,
  },
}));
