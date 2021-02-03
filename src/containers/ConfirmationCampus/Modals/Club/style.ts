import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  container: {
    width: '100%',
    height: '50%',
  },
  header: {
    width: '100%',
    height: 80,
    paddingTop: 20,
  },
  content: {
    display: 'flex',
    minHeight: 'auto',
    paddingBottom: '20px',
  },
}));
