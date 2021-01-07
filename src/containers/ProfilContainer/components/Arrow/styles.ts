import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles(() =>
  createStyles({
    arrowContainer: {
      display: 'flex',
      alignItems: 'center',
      width: 160,
    },
    txt: {
      color: '#6B6B6A',
      fontSize: 14,
      fontWeight: 'bold',
      marginLeft: 20,
      position: 'relative',
      bottom: 1,
    },
  }));
