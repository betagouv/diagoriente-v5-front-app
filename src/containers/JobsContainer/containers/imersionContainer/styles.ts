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
  },
  back: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
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
  bar: {
    color: '#C9C9C7',
  },
  filterMainTitle: {
    fontWeight: 'bold',
    fontSize: 18,
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
  },
  results: {
    flex: 1,
    paddingLeft: 30,
  },
  resultTitle: {
    color: theme.palette.success.main,
    fontSize: 28,
  },
}));
