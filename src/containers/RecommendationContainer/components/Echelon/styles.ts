import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  echelonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 0px',
  },
  echelonRoot: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginRight: 10,
    maxWidth: 248,
  },
  title: {
    color: '#00B2DB',
    fontSize: 14,
    fontWeight: 'bold',
  },
  niveau: {
    fontSize: 10,
  },
}));
