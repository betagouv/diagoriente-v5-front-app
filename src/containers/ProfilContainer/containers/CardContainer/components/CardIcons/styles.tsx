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
  gameWrapper: {
    position: 'relative',
  },
  gameIcon: {
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6ea3',
    borderRadius: '50%',
    marginRight: 11,
  },
  gameIconImage: {
    width: 22,
  },
  gameMenu: {
    position: 'absolute',
    width: 160,
    height: 200,
    borderRadius: 10,
    boxShadow: '0px 0px 5px -3px rgba(0, 0, 0, 0.75)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    top: 35,
    left: 26,
    '&:hover': {
      opacity: '1 !important',
    },
  },
  boxInfoImg: {
    marginTop: 19,
    marginBottom: 14,
  },
  linkBoxInfo: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#D60051',
    lineHeight: '20px',
    marginTop: 12,
    marginBottom: 12,
  },
  spinnerContainer: {
    width: 68,
    justifyContent: 'center',
    display: 'flex',
    paddingBottom: 30,
    paddingRight: 31,
  },
});
