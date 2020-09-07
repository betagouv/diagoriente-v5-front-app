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
    justifyContent: 'space-between',
  },
  titleImmersion: {
    textAlign: 'center',
  },
  back: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    left: 0,
    top: 66,
    width: 286,
  },
  empty: {
    width: '286px',
  },
  arrow: {
    transform: 'rotate(180deg)',
  },
  textBack: {
    color: '#6B6B6A',
    fontWeight: 'bold',
    marginLeft: 19,
    width: '100%',
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
    marginTop: 25,
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
  loadingContainer: {
    paddingBottom: 300,
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

  titleContainerContact: {
    fontSize: 42,
    fontFamily: 'ocean',
    marginTop: 25,
    textAlign: 'center',
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

  iconAttention: {
    marginRight: 22,
  },

  descriptionModalContainer: {
    fontSize: 18,
    textAlign: 'center',
    color: '#424242',
    marginTop: 20,
    marginBottom: 20,
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
    marginBottom: 15,
    width: 145,
  },

  btnLabel: {
    color: '#011A5E',
    fontWeight: 'bold',
    fontSize: 16,
  },

  message: {
    color: '#FF0060',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    width: 555,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 40,
  },

  okButton: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  okText: {
    marginRight: 10,
  },
}));
