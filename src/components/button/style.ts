import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    borderRadius: 10,
  },
  labelContainer: {
    margin: '3px 20px 3px 19px',
    textTransform: 'none',
    fontFamily: 'Andika New Basic',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  loaderContainer: {
    marginLeft: 7,
    display: 'flex',
    alignItems: 'center',
  },
  colorPrimaryLoader: {
    color: '#fff',
  },
}));
