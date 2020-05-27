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

  textDescription: {
    marginTop: 70,
    marginBottom: 30,
    width: 500,
    alignItems: 'center',
    fontSize: 18,
  },

  text: {
    fontSize: 18,
    color: '#424242',
    width: '100%',
    textAlign: 'center',
  },

  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 30,
  },

  btn: {
    backgroundColor: theme.palette.secondary.main,
    fontSize: 18,
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#00B2DB',
    },
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

  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 53,
  },

  titleModal: {
    fontFamily: 'ocean',
    fontSize: 32,
    textAlign: 'center',
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    marginTop: 23,
  },

  descriptionModal: {
    fontSize: 18,
    textAlign: 'center',
    color: '#424242',
    marginTop: 25,
    marginBottom: 20,
  },

  descriptionModalContainer: {
    fontSize: 18,
    textAlign: 'center',
    color: '#424242',
    marginTop: 25,
    marginBottom: 50,
  },

  subTitle: {
    fontSize: 14,
  },

  marginInput: {
    margin: '13px 0px 0px 0px',
  },

  fontInput: {
    fontSize: 14,
    '&::placeholder': {
      color: '#C9C9C7',
      opacity: 1,
    },

    '&::-ms-input-placeholder': {
      color: '#C9C9C7',
      opacity: 1,
    },

    '&::-ms-input-placeholder ': {
      color: '#C9C9C7',
      opacity: 1,
    },
  },

  experienceContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 91,
    paddingRight: 107,
    marginBottom: 30,
  },

  formContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 63,
    paddingLeft: 91,
    paddingRight: 107,
  },

  inputContainer: {
    display: 'flex',
  },

  iconBackground: {
    background: '#ffff',
    marginTop: 41,
  },

  message: {
    color: '#FF0060',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
  },

  btnpreced: {
    color: '#6B6B6A',
    height: 50,
    marginTop: 33,
    fontSize: 14,
    textAlign: 'center',
    textDecoration: 'underline',
  },

  arrowpreced: {
    marginRight: 13,
  },

  btnContainerModal: {
    display: 'flex',
    justifyContent: 'center',
  },

  btnSuccModal: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 7,
  },

  precedbutton: {
    display: 'flex',
    '&:hover': {
      backgroundColor: 'none',
    },
  },

  avatar: {
    paddingBottom: 100,
  },

  btnSkillCardContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 173,
    marginTop: 30,
  },

  btnSkillCard: {
    backgroundColor: '#FFA600',
    fontSize: 18,
    fontWeight: 'bold',
    '&:hover': {},
  },

  textArea: {
    background: '#FFFF',
    borderRadius: 5,
    width: '100%',
    resize: 'none',
  },
}));
