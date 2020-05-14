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
    color: '#424242',
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
  },
  modalBody: {},
  titleModal: {
    fontFamily: 'ocean',
    fontSize: 32,
    textAlign: 'center',
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
  },
  descriptionModal: {
    fontSize: 18,
    textAlign: 'center',
    color: '#424242',
    marginTop: 40,
  },
  subTitle: {
    fontSize: 14,
  },

  experienceContainer: {
    width: '100%',
    display: 'flex',
    marginTop: 34,
  },
  expPerso: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    height: 150,
  },
  titlePerso: {
    color: '#00B2DB',
    fontWeight: 900,
    fontSize: 18,
  },
  expPro: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    height: 150,
  },
  titlePro: {
    color: '#223A7A',
    fontWeight: 900,
    fontSize: 18,
  },
  btnContainerModal: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 30,
  },
}));
