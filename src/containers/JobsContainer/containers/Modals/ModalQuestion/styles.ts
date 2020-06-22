import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    height: 300,
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
  description: {
    fontWeight: 900,
    fontSize: 26,
    fontFamily: 'ocean',
    textTransform: 'uppercase',
    color: theme.palette.success.main,
    textAlign: 'center',
    marginTop: 10,
  },
  questionContainer: {
    fontFamily: 'ocean',
    fontSize: 42,
    textAlign: 'center',
    color: theme.palette.success.main,
    marginTop: 15,
  },
  sliderContainer: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
  },
}));
