import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #6B6B6A',
    paddingBottom: 20,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
  },
  userName: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 18,
  },
  appInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  appLogo: {
    marginRight: 30,
  },
});
