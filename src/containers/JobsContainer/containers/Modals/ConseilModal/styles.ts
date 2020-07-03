import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: '0px 50px',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleContainer: {
    fontSize: 42,
    fontFamily: 'ocean',
    marginTop: 25,
  },
  description: {
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.palette.primary.main,
  },
  info: {
    marginTop: 20,
  },
  text: {
    fontSize: 15,
  },
  logoContainerBtn: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 40,
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  btnLabel: {
    color: '#011A5E',
    fontWeight: 'bold',
    fontSize: 18,
  },
}));
