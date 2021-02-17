import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    maxWidth: 1080,
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: 60,
  },
  title: {
    fontFamily: 'ocean',
    fontSize: 62,
    fontWeight: 900,
    color: theme.palette.secondary.main,
  },
  description: {
    marginTop: 70,
    marginBottom: 70,
    width: '100%',
  },
  text: {
    fontSize: 18,
    width: '100%',
    textAlign: 'center',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 30,
  },
  btn: {
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  btnLabel: {
    color: '#FFF',
  },

  info: {
    textAlign: 'center',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 900,
  },
  link: {
    color: '#424242',
  },
}));
