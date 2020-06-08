import { makeStyles } from '@material-ui/core/styles';
import bgSvg from 'assets/svg/bg.svg';

export default makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundImage: `url(${bgSvg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
    paddingTop: `${(1024 / 1440) * 100}%`,
    position: 'relative',
  },
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  boxWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  types: {
    width: 390,
  },
  content: {},
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontFamily: 'ocean',
    fontSize: 45,
    fontWeight: 900,
    color: theme.palette.secondary.main,
  },
  image: {},
}));
