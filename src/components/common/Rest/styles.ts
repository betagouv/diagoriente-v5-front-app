import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { color: string; size?: number }>((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      justifySelf: 'flex-end',
    },
  },
  root: {
    width: (props) => (props.size ? props.size : 33),
    height: (props) => (props.size ? props.size : 33),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: (props) => props.color,
  },
  subTitle: {
    paddingRight: 12,
    fontSize: 12,
    color: (props) => props.color,
  },
}));
