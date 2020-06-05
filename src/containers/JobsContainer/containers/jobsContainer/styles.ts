import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 30,
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
    alignItems: 'baseline',
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
  },
}));
