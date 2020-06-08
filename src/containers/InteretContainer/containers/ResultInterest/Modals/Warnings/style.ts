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
    width: '70%',
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
}));
