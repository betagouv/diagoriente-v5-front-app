import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '70vh',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#E5E5E5',
  },
  content: { width: '80%', marginTop: '5%', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  btnContainer: {
    marginTop: 40,
    width: '70%',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  btnContainerSuccess: {
    marginTop: 40,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginTop: 10,
  },
  defaultValue: {
    fontSize: 14,
    color: '#6B6B6A',
  },
  textArea: {
    background: '#FFFF',
    borderRadius: 5,
    width: '100%',
    resize: 'none',
  },
  btn: {
    backgroundColor: '#fe3708',
    width: 200,
    height: 44,
    color: '#fff',
    '&:hover': {
      backgroundColor: '#fe3708',
    },
  },
}));
