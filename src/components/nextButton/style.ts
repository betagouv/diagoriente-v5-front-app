import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  btnperso: {
    position: 'absolute',
    backgroundColor: '#00CFFF',
    bottom: -25,
    left: '50%',
    transform: 'translate(-50%,0)',
    height: 50,
    '&:hover': {
      backgroundColor: '#00B2DB ',
      borderRadius: 10,
    },
  },

  contentBtn: {
    display: 'flex',
    alignItems: 'center',
  },


  btnLabel: {
    color: '#223A7A',
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginRight: 10,
    paddingBottom: 4,
  },

  margin: {
    margin: '0px 20px',
  },
}));