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
  chip: {
    height: 'auto',
    minHeight: 32,
    maxWidth: '100%',
    whiteSpace: 'normal',
    margin: 5,
    padding: '6px 0',
    '& span': {
      whiteSpace: 'normal',
      flex: '1 1 0',
    },
  },
  paper: {
    maxHeight: 150,
  },
}));
