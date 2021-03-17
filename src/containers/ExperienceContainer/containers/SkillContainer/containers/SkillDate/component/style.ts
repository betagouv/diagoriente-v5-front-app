import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    wrapperSelect: {
      display: 'flex',
      position: 'relative',
    },
    selectContainer: {
      background: '#FFFFFF',
      border: '1px solid #D1D5DE',
      borderRadius: '5px 0px 0px 5px',
      width: 146,
      height: 39,
    },
    arrowContainer: {
      background: '#00CFFF',
      border: '1px solid #D1D5DE',
      boxSizing: 'border-box',
      borderRadius: '0px 5px 5px 0px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 39,
      width: 39,
    },
    options: {
      position: 'absolute',
      top: 40,
      height: 200,
      width: 380,
      background: '#FFFFFF',
      border: '1px solid #C9C9C7',
      boxSizing: 'border-box',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)',
      borderRadius: 5,
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      zIndex: 1,
      padding: '17px 26px',
    },
    option: {
      width: 'fit-content',
      height: 29,
      fontSize: 18,
      lineHeight: '29px',
      cursor: 'pointer',
      margin: 0,
      '&:hover': {
        background: '#7AE6FF',
        opacity: 0.6,
        borderRadius: 5,
        padding: '0px 3px',
      },
    },
    selected: {
      color: '#00B2DB',
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: '26px',
    },
  }),
);
