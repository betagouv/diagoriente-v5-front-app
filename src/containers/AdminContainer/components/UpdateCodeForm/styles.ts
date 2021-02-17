import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  wrapper: {
    flex: '1 1 0',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 20px',
  },
  title: {
    gridArea: 'title',
  },
  button: {
    height: 44,
    alignSelf: 'center',
    width: '60%',
  },
}));
