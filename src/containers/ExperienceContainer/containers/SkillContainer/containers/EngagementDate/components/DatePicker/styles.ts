import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    selectContainer: {
      width: 'auto',
      background: '#fff',
      borderRadius: '5px',
      fontWeight: 'normal',
      color: '#5A6170',
      '& fieldset': {
        borderColor: '#D1D5DE',
        background: 'transparent',
        '&:focus-within': {
          borderColor: '#00CFFF !important',
          background: 'transparent',
        },
        '&:hover': {
          borderColor: '#00CFFF !important',
          background: 'transparent',
        },
      },
    },
    day: {
      width: '74px !important',
    },
    month: {
      width: '128px !important',
      textTransform: 'capitalize',
    },
    year: {
      width: '93px !important',
    },

    disabledClassName: {
      display: 'none',
    },

    menuItemClassName: {
      margin: '0px 15px !important',
      paddingTop: '5px !important',
      paddingLeft: '0px !important',
      paddingBottom: '10px !important',
    },
  }));
