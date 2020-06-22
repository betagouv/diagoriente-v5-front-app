import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { checked: boolean }>((theme) => ({
  root: {
    display: 'flex',
  },
  circleContainer: {
    width: 14,
    height: 14,
    border: (props) => `1px solid ${props.checked ? theme.palette.success.main : '#C9C9C7'}`,
    background: (props) => (props.checked ? theme.palette.secondary.main : '#FFFFFF'),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleSmall: {
    width: 8,
    height: 8,
    backgroundColor: theme.palette.success.main,
  },
  label: {
    fontWeight: (props) => (props.checked ? 'bold' : 'normal'),
  },
}));
