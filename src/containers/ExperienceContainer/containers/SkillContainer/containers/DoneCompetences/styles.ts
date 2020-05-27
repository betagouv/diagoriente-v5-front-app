import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
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
    marginTop: 60,
  },

  title: {
    fontFamily: 'ocean',
    fontSize: 62,
    fontWeight: 900,
    color: '#FF0060',
  },

  description: {
    marginTop: 45,
    marginBottom: 50,
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
  avatar: {
    paddingBottom: 100,
  },

  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 30,
  },

  btnSkillCardContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 173,
    marginTop: 30,
  },

  btn: {
    backgroundColor: theme.palette.secondary.main,
    fontSize: 18,
    fontWeight: 'bold',
    '&:hover': {},
  },

  btnSkillCard: {
    backgroundColor: '#FFA600',
    fontSize: 18,
    fontWeight: 'bold',
    '&:hover': {},
  },

  btnLabel: {
    color: theme.palette.info.main,
  },

  info: {
    textAlign: 'center',
    textDecoration: 'underline',
    fontSize: 14,
    paddingBottom: 130,
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
    marginTop: 40,
  },

  subTitle: {
    fontSize: 14,
  },
}));
