import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0%',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },

  icon: {
    height: 'auto',
    marginTop: 20,
  },
  text: {
    fontSize: 12,
    margin: '10px 0px',
  },
}));
