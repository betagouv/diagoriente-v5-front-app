import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
  },
  loader: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3000,
  },
  titleContainer: {
    paddingBottom: 24,
    display: 'flex',
  },
  title: {
    fontSize: 42,
    fontFamily: 'Ocean',
    color: theme.palette.secondary.main,
    lineHeight: '42px',
    flex: '1 1 0%',
    paddingRight: 40,
    textTransform: 'uppercase',
  },
  popupContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    flex: '1 1 0%',
    justifyContent: 'space-between',
  },

  popupDescription: {
    textAlign: 'center',
    color: '#424242',
    marginTop: 25,
  },

  incluse: {
    backgroundColor: '#FF0060',
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
    padding: '5px 15px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#D60051',
    },
  },

  link: {
    color: '#00B2DB',
    fontSize: 14,
    fontWeight: 'bold',
    textDecoration: 'none',
    marginTop: 14,
  },
  modalTitle: {
    textAlign: 'center',
  },
  arrowContainerWidth: {
    width: 150,
  },
  arrowContainer: {
    alignItems: 'center',
    color: theme.palette.primary.main,
    display: 'flex',
    fontSize: 16,
    cursor: 'pointer',
  },
  arrow: {
    marginRight: 8,
    position: 'relative',
    top: 1,
  },
}));
