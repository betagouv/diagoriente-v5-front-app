import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { color: string }>(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
    cursor: 'pointer',
  },
  root: {
    width: 32,
    height: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: (props) => props.color,
  },
  subTitle: {
    paddingRight: 12,
    fontSize: 12,
    color: '#420FAB',
  },
}));
