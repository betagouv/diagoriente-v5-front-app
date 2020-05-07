import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  drawerPaper: {
    width: 400,
    backgroundColor: theme.palette.background.default,
    overflow: 'auto',
    display: 'flex',
    paddingTop: 20,
    [theme.breakpoints.down('xs')]: { width: '80%' },
    [theme.breakpoints.up('md')]: { display: 'none' },
  },

  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: 360,
    flex: '1 0 auto',
    [theme.breakpoints.up('md')]: { display: 'none' },
    padding: 26,
  },

  linkContainer: {
    margin: 0,
    listStyle: 'none',
    textDecoration: 'none',
    fontSize: 14,
    paddingBottom: 20,
  },

  link: {
    textDecoration: 'none',
    color: '#F3F2F4',
  },

  square: {
    padding: 10,
    background: '#ffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 20,
    paddingTop: 10,
    flex: '1 1 auto',
    justifyContent: 'flex-end',
  },

  betaGov: {
    marginTop: 5,
  },
}));
