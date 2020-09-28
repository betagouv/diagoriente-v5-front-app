import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  container: {
    display: 'flex',
    flex: '1 1 0%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileHeader: {
    color: '#223A7A',
    fontFamily: 'Ocean',
    fontWeight: 900,
    fontSize: '2.2em',
    lineHeight: 1,
  },
  logo: {
    marginTop: 4,
    height: 60,
    width: 60,
  },
  info: {
    fontSize: '1em',
    lineHeight: 1,
    color: '#223A7A',
    marginTop: 12,
  },
  link: {
    fontSize: '1em',
    lineHeight: 1,
    color: '#02B2DB',
    marginTop: 5,
    position: 'relative',
    zIndex: 3,
    '&:hover': {
      color: '#00CFFF',
    },
  },
  content: {
    display: 'flex',
    flex: '1 1 0%',
    width: '100%',
    paddingTop: 25,
    alignItems: 'stretch',
  },
  contentChild: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    lineHeight: '29px',
  },
  bold: {
    fontWeight: 900,
    WebkitTextStroke: '0.2px',
  },
  firstContent: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '85%',
  },
  itemContainer: {
    width: '38%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 10,
  },
  itemLink: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  itemButton: {
    backgroundColor: '#fff',
    width: '90%',
    fontSize: '1.7vw',
    fontFamily: 'Ocean',
    fontWeight: 900,
    paddingTop: 11,
    color: '#424242',
    '&:hover': {
      backgroundColor: '#fff',
      opacity: 0.7,
    },
  },
  itemDescription: {
    textAlign: 'center',
    fontSize: '0.96vw',
    color: '#fff',
  },
  black: {
    color: '#424242',
  },
  blue: {
    color: '#223A7A',
  },
  purple: {
    color: '#420FAB',
  },
  textModal: {
    fontSize: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
  },
});
