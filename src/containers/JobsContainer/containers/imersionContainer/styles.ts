import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    maxWidth: '1080px',
    width: '100%',
    marginTop: 30,
    padding: 4,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
  },
  titleImmersion: {
    textAlign: 'center',
  },
  back: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'absolute',
    left: 0,
    top: 66,
  },
  arrow: {
    transform: 'rotate(180deg)',
  },
  textBack: {
    color: '#6B6B6A',
    fontWeight: 'bold',
    marginLeft: 13,
  },
  wrapper: {
    display: 'flex',
  },
  immersionFormContainer: {
    marginBottom: 20,
  },
  filtersContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  filters: {
    borderRadius: 10,
    background: '#F3F2F4',
    width: 286,
    padding: '27px 30px',
    marginTop: 10,
  },
  switchMask: {
    display: 'flex',
  },
  maskTitle: {
    marginLeft: 13,
  },
  bar: {
    color: '#C9C9C7',
  },
  filterMainTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  filterTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  TrierContainer: {
    marginTop: 30,
  },
  distanceContainer: {
    marginTop: 30,
  },
  tailleContainer: {
    marginTop: 35,
  },
  boxSearch: {
    width: 286,
    height: 207,
    borderRadius: 10,
    backgroundColor: '#ffe9c3',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 22,
  },
  textTitleContainer: {
    display: 'flex',
    marginBottom: 20,
    alignItems: 'center',
  },
  edit: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 15,
  },
  textTitle: {
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  textEdit: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    paddingLeft: 5,
    cursor: 'pointer',
  },
  results: {
    flex: 1,
    paddingLeft: 30,
  },
  resultTitle: {
    color: theme.palette.success.main,
    fontSize: 28,
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  itemPage: {
    fontSize: 18,
    padding: '0px 10px',
    cursor: 'pointer',
    fontWeight: 100,
  },
  boldItem: {
    fontSize: 18,
    fontWeight: 'bolder',
  },
}));
