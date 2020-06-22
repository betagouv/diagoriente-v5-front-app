import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  selectContainer: {
    padding: '0 10px',
    display: 'flex',
    height: 35,
    borderRadius: 5,
    background: '#223A7A',
    '& div': {
      display: 'flex',
      width: 'auto',
      height: 35,
      padding: 0,
      alignItems: 'center',
      color: '#FFFFFF',
      fontSize: 14,
    },
    '& fieldset': {
      border: 'none',
      color: '',
    },
  },
  select: {
    paddingRight: '12px !important',
  },
}));
