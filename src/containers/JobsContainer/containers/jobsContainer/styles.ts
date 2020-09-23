import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 30,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
  },
  content: {
    maxWidth: 1080,
    width: '100%',
  },
  filtersContainer: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 92,
    padding: 20,
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 56,
    height: 57,
    marginRight: 20,
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 900,
    marginBottom: 30,
    marginTop: -20,
  },
  filterTitleContainer: {
    height: 35,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 7,
  },
  titleFilter: {
    fontFamily: 'ocean',
    fontWeight: 900,
    fontSize: 26,
    color: theme.palette.success.main,
  },
  containerAutoComp: {
    '& .MuiAutocomplete-inputRoot-228': {
      padding: 0,
    },
  },
  wrapperInput: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  boxsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 40,
    flex: '1 1 auto',
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
    width: '100%',
    flex: '1 1 auto',
  },
  messages: {
    backgroundColor: '#fff1f6',
    width: '100%',
    height: 110,
    display: 'flex',
    justifyContent: 'center',
  },
  contentMessage: {
    maxWidth: 1080,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  clearMessage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 18,
    width: '50%',
    flex: 1,
  },
  clearText: {
    fontWeight: 'bold',
    fontSize: 14,
    textDecorationLine: 'underline',
    color: '#D60051',
    paddingRight: 18,
    cursor: 'pointer',
  },
  clearTextBold: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#D60051',
    textDecorationLine: 'underline',
  },
  moreButton: {
    backgroundColor: theme.palette.primary.main,
    alignSelf: 'center',
    margin: '50px 0',
    '&:hover': {
      backgroundColor: '#DB8F00',
    },
  },
  textSelect: {
    padding: '0px 10px',
  },
  footerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  footerContent: {
    maxWidth: '1080px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemFooter: { width: '33%' },
  centerItem: { display: 'flex', justifyContent: 'center' },
  rightItem: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center' },
}));
