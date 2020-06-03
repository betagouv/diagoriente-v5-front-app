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
    fontSize: 14,
  },
  contentChildBlack: {
    color: '#424242',
  },
  bold: {
    fontWeight: 900,
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
  },
  itemButton: {
    color: '#424242',
    backgroundColor: '#fff',
    width: '90%',
    fontSize: '1.7vw',
    fontFamily: 'Ocean',
    fontWeight: 900,
    paddingTop: 11,
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
  itemDescription: {
    textAlign: 'center',
    fontSize: '0.96vw',
    color: '#fff',
  },
  black: {
    color: '#000',
  },
  blue: {
    color: '#223A7A',
  },
  purple: {
    color: '#420FAB',
  },
});
