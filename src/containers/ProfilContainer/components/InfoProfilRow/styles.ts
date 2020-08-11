import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles(() =>
  createStyles({
    infoRowContainer: {
      display: 'flex',
      padding: '13px 0px',
      alignItems: 'center',
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      WebkitTextStroke: '#424242',
      WebkitTextStrokeWidth: '0.1px',
      textAlign: 'right',
      width: 170,
      marginRight: 26,
    },
    userInfo: {
      fontSize: 14,
      flex: '1 1 auto',
    },
  }));
