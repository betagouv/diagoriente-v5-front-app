import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>((theme) => ({
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
  expContainer: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titlePerso: {
    color: '#00B2DB',
    fontWeight: 900,
    fontSize: 18,
  },
  titlePro: {
    color: '#223A7A',
    fontWeight: 900,
    fontSize: 18,
  },
  avatarStyle: {
    position: 'relative',
    maxHeight: '100%',
    maxWidth: '100%',
  },
  themesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  themeContainer: {
    width: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
  },
  themeTitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#424242',
    marginBottom: 3,
  },
  btnContainerModal: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 30,
  },
  link: {
    color: '#424242',
    fontSize: 14,
    fontWeight: 900,
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
}));
