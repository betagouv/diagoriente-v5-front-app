import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    width: 300,
    height: 76,
    display: 'flex',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: '15px 0px',
  },
  title: {
    fontFamily: 'ocean',
    fontWeight: 900,
    fontSize: 35,
  },
}));
