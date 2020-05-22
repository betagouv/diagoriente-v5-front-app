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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    marginBottom: 10,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      alignSelf: 'center !important',
    },
  },
  title: {
    fontSize: 42,
    color: theme.palette.primary.main,
    fontFamily: 'ocean',
    marginLeft: 24,
    [theme.breakpoints.down('xs')]: {
      alignSelf: 'center !important',
      fontSize: 41,
      marginLeft: 15,
    },
  },

  wrapper: {
    backgroundColor: '#E5E5E5',
    width: '100%',
    height: '85%',
    position: 'relative',
    marginBottom: 89,
  },
  loadingContainer: {
    width: '100%',
    height: 'calc(100vh - 166px)',
    backgroundColor: '#E5E5E5',
  },
  circleContainer: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    padding: '22px 0px',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      padding: 30,
      paddingBottom: 80,
    },
    [theme.breakpoints.down('sm')]: {
      padding: 30,
      paddingBottom: 80,
    },
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    height: 156,
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
    [theme.breakpoints.down('xs')]: {
      padding: 10,
      overflow: 'overlay',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      '-ms-overflow-style': 'none',
    },
  },
  footerContent: {
    maxWidth: 1080,
    width: '100%',
    display: 'flex',
    overflow: 'overlay',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '-ms-overflow-style': 'none',
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  contentBtn: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapperBtn: {
    alignSelf: 'center',
  },
  btnLabel: {
    color: '#fff',
    marginRight: 10,
  },
}));
