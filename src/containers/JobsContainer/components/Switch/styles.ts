import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { checked: boolean }>(() => ({
  switchContainer: {
    border: '2px solid #DB8F00',
    boxSizing: 'border-box',
    borderRadius: 20,
    background: '#FFD382',
    width: 60,
    height: 29,
    padding: 3,
    position: 'relative',
    opacity: (props) => (props.checked ? 1 : 0.5),
    cursor: 'pointer',
  },
  switchContent: {
    width: 23,
    height: 23,
    borderRadius: '50%',
    background: '#DB8F00',
    border: '1px solid #DB8F00',
    position: 'absolute',
    right: (props) => (props.checked ? 1 : 32),
    transition: 'all 0.5s ease',
    top: 1,
  },
}));
