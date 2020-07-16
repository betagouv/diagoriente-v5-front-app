import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 20,
  },

  content: {
    maxWidth: 1080,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  header: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: 45,
  },

  title: {
    fontFamily: 'ocean',
    fontSize: 62,
    fontWeight: 900,
    color: '#FF0060',
  },

  description: {
    marginTop: 30,
    marginBottom: 20,
    width: 500,
    alignItems: 'center',
    fontSize: 42,
    fontWeight: 900,
  },

  text: {
    fontSize: 18,
    color: '#424242',
    width: '100%',
    textAlign: 'center',
  },
  avatar: {},

  btnskillContainer: {
    paddingTop: 30,
    display: 'flex',
    flexDirection: 'column',
  },

  btnskillFirstUser: {
    paddingTop: 20,
    paddingBottom: 20,
  },

  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 15,
  },

  btnSkillCardContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: 40,
  },

  btn: {
    backgroundColor: theme.palette.secondary.main,
    fontSize: 18,
    fontWeight: 'bold',
    width: 340,
    '&:hover': {
      backgroundColor: '#00B2DB',
    },
  },

  btnFirstUse: {
    backgroundColor: '#7533FF',
    fontSize: 18,
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#420FAB',
    },
  },

  btnLabelFirstUse: {
    color: '#fff',
  },

  btnSkillCard: {
    backgroundColor: '#D60051',
    fontSize: 18,
    fontWeight: 'bold',
    width: 340,
    color: '#fff',
    '&:hover': {
      backgroundColor: '#FF0060',
    },
  },

  btnLabel: {
    color: theme.palette.info.main,
  },

  info: {
    textAlign: 'center',
    textDecoration: 'underline',
    fontSize: 14,
    paddingBottom: 50,
    cursor: 'pointer',
    color: '#424242',
    fontWeight: 'bold',
  },

  titleModal: {
    fontFamily: 'ocean',
    fontSize: 32,
    textAlign: 'center',
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
  },

  descriptionModal: {
    fontSize: 18,
    textAlign: 'center',
    color: '#424242',
    marginTop: 30,
  },

  subTitle: {
    fontSize: 14,
  },

  size: {
    fontSize: 18,
  },

  titleThemeDone: {
    fontSize: 20,
  },

  checked: {
    marginLeft: 10,
  },
}));
