import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  iconsContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  success: {
    color: theme.palette.success.main,
  },
}));
