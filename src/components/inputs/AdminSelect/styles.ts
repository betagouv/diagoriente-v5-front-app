import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 24,
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
  },
  error: {
    fontSize: 14,
    lineHeight: 14,
    color: theme.palette.error.main,
    fontStyle: 'italic',
    position: 'absolute',
    top: 'calc(100% - 19px)',
  },
  paper: {
    maxHeight: 250,
  },
}));
