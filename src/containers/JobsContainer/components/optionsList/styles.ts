import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>(() => ({
  root: {
    width: 235,
    background: '#FFFFFF',
    border: '1px solid #C9C9C7',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: 5,
    position: 'absolute',
    top: 47,
  },
  item: {
    height: 46,
    borderBottom: '0.5px solid #C9C9C7',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
    cursor: 'pointer',
  },
  itemText: {
    fontSize: 14,
    color: '#424242',
    paddingLeft: 10,
  },
}));
