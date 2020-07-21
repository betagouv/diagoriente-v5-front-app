import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  btnperso: {
    position: 'absolute',
    backgroundColor: '#00CFFF',
    bottom: -25,
    left: '50%',
    minWidth: 156,
    transform: 'translate(-50%,0)',
    height: 50,
    borderRadius: 10,
    '&:hover': {
      backgroundColor: '#00B2DB ',
    },
    '&:disabled': {
      backgroundColor: '#7AE6FF',
    },
  },

  contentBtn: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },

  btnLabel: {
    color: '#223A7A',
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginRight: 10,
    paddingBottom: 4,
    flex: 1,
  },

  arrow: {
    position: 'absolute',
    right: 19,
  },

  margin: {
    margin: '0px 20px',
  },
  loaderContainer: {
    marginLeft: 7,
    display: 'flex',
    alignItems: 'center',
  },
  colorPrimaryLoader: {
    color: '#fff',
  },
}));
