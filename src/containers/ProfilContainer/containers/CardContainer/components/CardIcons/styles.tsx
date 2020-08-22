import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  headerIcons: {
    gridArea: 'icons',
    display: 'flex',
  },
  headerIcon: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B6B6A',
    marginLeft: 22,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.7,
    },
  },
  headerIconImage: {
    width: 30,
    marginRight: 11,
  },
  gameIcon: {
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6ea3',
    borderRadius: '50%',
    marginRight: 11
  },
  gameIconImage: {
    width: 22,
  },
  spinnerContainer: {
    width: 68,
    justifyContent: 'center',
    display: 'flex',
    paddingBottom: 30,
    paddingRight: 31,
  },
});
