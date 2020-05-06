import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 8,
  },
  'MuiCheckbox-colorSecondary': {
    color: '#c9C9C7',
    padding: 0,
    '&.Mui-checked': {
      color: '#00CFFF',
      borderRadius: 5,
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));
