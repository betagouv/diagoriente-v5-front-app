import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 900,
    fontSize: 26,
    fontFamily: 'ocean',
    textTransform: 'uppercase',
  },
  titleQuestion: {
    paddingTop: 30,
  },
  description: {
    fontWeight: 900,
    fontSize: 26,
    fontFamily: 'ocean',
    textTransform: 'uppercase',
    color: theme.palette.success.main,
    textAlign: 'center',
    marginTop: 10,
  },
  descriptionContainer: {
    paddingTop: 30,
  },
  lastContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 40,
  },
  textDescription: {
    textAlign: 'center',
    fontWeight: 900,
  },
  btnLabel: {
    fontSize: 15,
    fontWeight: 900,
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 40,
  },
  questionContainer: {
    fontFamily: 'ocean',
    fontSize: 42,
    textAlign: 'center',
    color: theme.palette.success.main,
    marginTop: 15,
  },
  errorQuestion: {
    marginTop: 15,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  sliderContainer: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 55,
  },
}));
