import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '70vh',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '10%',
    backgroundColor: '#E5E5E5',
  },
  content: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bigTitle: {
    fontSize: 60,
    fontFamily: 'Ocean',
    color: '#fe3708',
    textAlign: 'center',
  },
  subTitle: {
    marginTop: 10,
  },
  subMessage: {
    marginTop: 10,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#fe3708',
    width: 200,
    height: 44,
    marginTop: 50,
    '&:hover': {
      backgroundColor: '#fe3708',
    },
  },
  textBtn: {
    color: '#FFF',
  },
}));
