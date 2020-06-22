import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>((theme) => ({
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleModal: {
    fontFamily: 'ocean',
    fontSize: 32,
    textAlign: 'center',
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
  },
  descriptionModal: {
    marginTop: 90,
    display: 'flex',
    justifyContent: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
  },
  btnContainerModal: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 130,
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
  },
}));
