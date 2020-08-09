import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 24,
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height: 151,
    background: '#f2eff0',
  },
  hidden: {
    display: 'none',
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
    cursor: 'pointer',
  },
  error: {
    fontSize: 14,
    lineHeight: 14,
    color: theme.palette.error.main,
    fontStyle: 'italic',
    position: 'absolute',
    top: 'calc(100% - 19px)',
  },
}));
