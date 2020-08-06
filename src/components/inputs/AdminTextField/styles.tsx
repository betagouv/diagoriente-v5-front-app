import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  fullWidth: {
    width: '100%',
  },
  container: {
    position: 'relative',
    width: '100%',
    paddingBottom: 24,
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
