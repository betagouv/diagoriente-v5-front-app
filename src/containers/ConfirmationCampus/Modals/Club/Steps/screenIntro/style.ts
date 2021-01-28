import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    minHeight: 320,
  },
  content: {
    width: '100%',
    marginTop: 75,
    display: 'flex',
    justifyContent: 'center',
  },
  header: {
    textAlign: 'center',
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: '#fe3708',
    margin: '0px 10px',
    width: 200,
    height: 44,
    color: '#fff',
    '&:hover': {
      backgroundColor: '#fe3708',
    },
  },
  textBtn: {
    fontSize: 18,
  },
}));
