import { makeStyles } from '@material-ui/core/styles';
const MAX_WIDTH = 600;
const FONT_SIZE = 16;
export const PADDING = '0px 50px'

export default makeStyles((theme) => ({
  root: {
    padding: PADDING,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 25,
  },
  titleContainer: {
    fontSize: 42,
    fontFamily: 'ocean',
    marginTop: 25,
  },
  description: {
    fontWeight: 'bold',
    fontSize: FONT_SIZE,
    color: '#db8f00',
    maxWidth: MAX_WIDTH,
    width: '100%',
  },
  info: {
    marginTop: 20,
    maxWidth: MAX_WIDTH,
  },
  text: {
    fontSize: FONT_SIZE,
  },
  logoContainerBtn: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 40,
    paddingBottom: 30,
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
    fontSize: FONT_SIZE,
  },
}));
