import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { height: number; full?: boolean }>((theme) => ({
  root: {
    marginRight: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  index: {
    fontFamily: 'ocean',
    fontSize: 50,
    color: theme.palette.primary.main,
  },
  container: {
    width: 113,
    backgroundColor: theme.palette.secondary.main,
    border: (props) => (props.full ? `4px solid ${theme.palette.primary.main}` : 'none'),
    borderRadius: 10,
    height: (props) => props.height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: (props) => (props.full ? 1 : 0.5),
  },
}));
