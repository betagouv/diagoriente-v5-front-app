import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>((theme) => ({
  container: {
    width: '100%',
    height: `100%`,
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    marginBottom: 10,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
  },
  titleTopContainer: { display: 'flex', justifyContent: 'center', flex: 1 },
  topTitle: {
    fontSize: 35,
    fontWeight: 900,
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    margin: '0px 5px',
  },
  bottomTitle: {
    fontSize: 35,
    fontWeight: 900,
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    margin: '0px 5px',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      alignSelf: 'center !important',
    },
  },
  linkContainer: {
    width: 'auto',
    paddingRight: 20,
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
    height: '19%',
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '4px -4px 4px rgba(0, 0, 0, 0.25)',
    padding: '10px 60px 10px 10px',
    [theme.breakpoints.down('xs')]: {
      padding: 10,
      overflow: 'overlay',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      '-ms-overflow-style': 'none',
    },
  },
  description: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
    lineHeight: '22px',
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 10,
  },
  footerContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
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
