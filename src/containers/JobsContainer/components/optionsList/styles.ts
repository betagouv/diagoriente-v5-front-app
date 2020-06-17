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
    zIndex: 5,
  },
  item: {
    height: 46,
    borderBottom: '0.5px solid #C9C9C7',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
    cursor: 'pointer',
    position: 'relative',
  },
  itemText: {
    fontSize: 14,
    paddingLeft: 10,
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1200,
  },
}));
