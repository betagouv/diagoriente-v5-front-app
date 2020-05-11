import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>((theme) => ({
  container: {
    width: '100%',
    height: `100%`,
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    maxWidth: 1080,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    height: 50,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 42,
    color: '#420FAB',
    fontFamily: 'ocean',
  },

  wrapper: {
    backgroundColor: '#E5E5E5',
    width: '100%',
    height: 'calc(100% - 166px)',
    position: 'relative',
  },
  loadingContainer: {
    width: '100%',
    height: 'calc(100vh - 166px)',
    backgroundColor: '#E5E5E5',
  },
  circleContainer: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    padding: '50px 135px',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      padding: 30,
    },
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    height: 156,
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
  },
}));
