import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  drawerPaper: {
    width: '287px',
    height: 'auto',
    backgroundColor: theme.palette.background.default,
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
    borderRadius: '0px 0px 10px 0px',
    [theme.breakpoints.down('xs')]: { width: '80%' },
  },

  root: {
    width: '100%',
    maxWidth: 360,
  },

  linkContainer: {
    margin: 0,
    listStyle: 'none',
    textDecoration: 'none',
    fontSize: 14,
    paddingBottom: 10,
    paddingTop: 14,
    borderBottom: '0.5px solid rgba(255,255,255,0.5)',
    '&:last-child': {
      border: 'none',
      paddingBottom: 0,
    },
  },

  link: {
    textDecoration: 'none',
    color: '#F3F2F4',
    width: '100%',
    position: 'relative',
  },
  linkJob: {
    textDecoration: 'none',
    color: '#223A7A',
    width: 'fit-content',
    position: 'relative',
  },
  firstUseLink: {
    backgroundColor: '#ffc354',
    borderRadius: 7,
    padding: 5,
    fontSize: 15,
    fontWeight: 'bolder',
  },

  square: {
    width: '80px',
    height: '50px',
    background: '#ffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 20,
    paddingTop: 10,
  },

  toolbar: {
    height: 39,
  },
  textMsg: {
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '31px',
    color: '#fff',
    width: '492px',
    paddingTop: 34,
    paddingLeft: 15,
  },
  btn: {
    backgroundColor: '#FFA600',
    marginTop: 20,
    marginLeft: 16,
    '&:hover': {
      backgroundColor: '#FFA600',
    },
  },
  btnLabel: {
    color: '#223A7A',
    fontWeight: 'bold',
  },
}));
