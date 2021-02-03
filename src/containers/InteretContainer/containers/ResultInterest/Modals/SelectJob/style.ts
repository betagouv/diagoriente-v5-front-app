import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>((theme) => ({
  modalBody: {
    overflow: 'auto',
  },
  titleModal: {
    fontFamily: 'ocean',
    fontSize: 32,
    textAlign: 'center',
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
  },
  descriptionModal: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 40,
  },
  subTitle: {
    fontSize: 14,
    marginTop: 15,
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
    width: 'content-fit',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    cursor: 'pointer',
  },
  themeContainerPro: {
    border: '1px solid #00B2DB',
    borderRadius: 30,
  },
  themeContainerProSelected: {
    backgroundColor: '#00CFFF',
  },
  themeContainerPersoSelected: {
    backgroundColor: 'rgba(122, 230, 255, 0.5)',
    borderRadius: 10,
  },

  themeTitle: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 3,
  },
  btnContainerModal: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 30,
  },
  link: {
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
  aide: {
    width: 51,
    height: 50,
    backgroundColor: '#C9C9C7',
    position: 'fixed',
    bottom: 20,
    right: 20,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aideText: {
    fontWeight: 900,
    fontSize: 40,
    fontFamily: 'ocean',
    color: '#FFFFFF',
    paddingTop: 5,
    cursor: 'pointer',
  },
  accessibility: {
    paddingTop: 80,
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 150,
  },
}));
