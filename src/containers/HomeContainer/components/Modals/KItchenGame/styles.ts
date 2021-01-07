import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 15,
  },
  title: {
    fontSize: 32,
    fontFamily: 'ocean',
    fontWeight: 900,
    color: theme.palette.secondary.main,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  imageContainer: {
    marginTop: 15,
  },
  btnContainer: {
    marginTop: 25,
  },
  btn: {
    backgroundColor: '#00CFFF',
    '&:hover': {
      backgroundColor: '#00CFFF',
    },
  },
  labelBtn: {
    color: theme.palette.primary.main,
  },
  infoContainer: {
    marginTop: 13,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 12,
    color: '#00B2DB',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    textAlign: 'center',
    cursor: 'pointer',
  },
}));
