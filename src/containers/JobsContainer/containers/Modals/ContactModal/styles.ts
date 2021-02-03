import { makeStyles } from '@material-ui/core/styles';

const MAX_WIDTH = 700;
const FONT_SIZE = 16;
const PADDING = '0px 50px 30px 50px';
export default makeStyles(() => ({
  root: {
    padding: PADDING,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  maxWidth: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: MAX_WIDTH,
  },

  titleContainer: {
    fontSize: 42,
    fontFamily: 'ocean',
    marginTop: 25,
    textAlign: 'center',
    textTransform: "uppercase",
  },

  contactContainer: {
    width: '100%',
    fontSize: FONT_SIZE,
    padding: '20px 0',
  },
  information: {
    background: '#F3F2F4',
    border: '1px solid #C9C9C7 ',
    padding: '15px 24px',
    borderRadius: 5,
    fontSize: FONT_SIZE - 2,
  },

  text: {
    fontSize: FONT_SIZE,
    padding: '5px 0px 20px 0px',
  },

  textBold: {
    WebkitTextStroke: '#424242',
    WebkitTextStrokeWidth: '0.4px',
  },

  textArea: {
    background: '#FFFF',
    borderRadius: 5,
    resize: 'none',
    width: '100%',
  },

  defaultValue: {
    fontSize: 14,
    '&::placeholder': {
      opacity: 1,
      color: '#6B6B6A',
    },
  },

  textIdeaContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 20,
  },
  textIdeaRoot: {
    display: 'flex',
    color: '#db8f00',
    width: '100%',
    paddingBottom: 20,
    WebkitTextStroke: '#db8f00',
    WebkitTextStrokeWidth: '0.2px',
  },
  textIdea: {
    paddingLeft: 10,
  },
  ideaText: {
    fontSize: 12,
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    paddingTop: 25,
    paddingBottom: 20,
  },
  checkboxText: {
    paddingLeft: 10,
  },

  btn: {
    position: 'relative',
    left: 'auto',
    bottom: 'auto',
    right: 'auto',
    top: 'auto',
    backgroundColor: '#FFA600',
    alignSelf: 'center',
    transform: 'none',
    '&:hover': {
      backgroundColor: '#FFA600',
    },
  },
  btnLabel: {
    color: '#011A5E',
    fontWeight: 'bold',
    fontSize: FONT_SIZE,
  },

  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  iconBackground: {
    background: '#ffff',
    marginTop: 30,
  },

  descriptionModalContainer: {
    fontSize: 18,
    textAlign: 'center',
    color: '#424242',
    marginTop: 20,
    marginBottom: 50,
  },

  message: {
    color: '#FF0060',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
  },
}));
