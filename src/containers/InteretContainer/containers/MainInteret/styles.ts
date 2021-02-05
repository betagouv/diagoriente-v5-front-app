import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>((theme) => ({
  container: {
    margin: 50,
    display: 'flex',
    flexDirection: 'column',
  },
  titleContainer: {
    fontWeight: 'bold',
    fontSize: 42,
    fontFamily: 'ocean',
    color: theme.palette.secondary.main,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'ocean',
    color: theme.palette.primary.main,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 25,
  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
  },
  textFooter: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: '26px',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));
