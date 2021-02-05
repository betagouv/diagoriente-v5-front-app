import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#011A5E',
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
  },
  btnContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
  },
  btn: {
    width: 200,
    height: 44,
    backgroundColor: '#011A5E',
    '&:hover': {
      backgroundColor: '#011A5E',
    },
  },
  btnLabel: {
    color: '#fff',
  },
}));
