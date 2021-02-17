import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: 30,
    border: 'none',
  },
  page: {
    height: 27,
    width: 27,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '0 0 auto',
    margin: '0 5px',
  },
  pageSelected: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
  separator: {
    pointerEvents: 'none',
    margin: 0,
    letterSpacing: 3,
  },
  arrow: {
    margin: 0,
  },
}));
