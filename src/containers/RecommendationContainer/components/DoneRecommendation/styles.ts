import { makeStyles } from '@material-ui/core/styles';

const PADDING_CARD = '15px 60px';
export default makeStyles((theme) => ({
  container: {
    padding: '50px 150px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: '1 1 auto',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    maxWidth: '660px',
    border: '1px solid #C9C9C7',
    borderRadius: 10,
    height: 'auto',
    marginTop: 29,
  },

  headerCard: {
    display: 'flex',
    width: '100%',
    background: theme.palette.primary.main,
    borderRadius: '10px 10px 0px 0px',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: PADDING_CARD,
  },

  header: {
    display: 'flex',
    flexDirection: 'column',
  },

  themeHeader: {
    fontSize: 18,
    color: theme.palette.info.main,
  },

  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorText: {
    fontSize: 12,
    color: theme.palette.info.main,
    textDecoration: 'underline',
    marginLeft: 10,
  },

  competenceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  bodyCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: PADDING_CARD,
  },

  recommendation: {
    fontSize: 18,
    color: theme.palette.info.main,
    padding: '34px 0px 13px 0px',
    textAlign: 'center',
  },

  textArea: {
    background: '#FFFF',
    borderRadius: 5,
    resize: 'none',
    width: '80%',
    maxWidth: '660px',
  },

  defaultValue: {
    fontSize: 14,
    color: '#6B6B6A',
  },

  hideLine: {
    textDecoration: 'none',
  },

  button: {
    position: 'relative',
  },

  btnpreced: {
    color: '#6B6B6A',
    height: 50,
    marginTop: 25,
    fontSize: 14,
    textAlign: 'center',
    textDecoration: 'underline',
    fontWeight: 'bold',
    lineHeight: '20px',
  },

  location: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },

  containerClassName: {
    maxWidth: 200,
  },

  btnContainerModal: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 25,
  },
  btn: {
    backgroundColor: theme.palette.secondary.main,
    fontSize: 18,
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#00B2DB',
    },
  },

  btnLabel: {
    color: theme.palette.info.main,
  },

  text: {
    fontWeight: 'bold',
  },
}));
