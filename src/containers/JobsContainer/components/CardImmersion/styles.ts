import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>((theme) => ({
  root: {
    border: '1px solid #C9C9C7',
    borderRadius: 5,
    minHeight: 165,
    margin: '10px 0px',
    transition: '1s ease-in-out',
  },
  infoImmersion: {
    display: 'flex',
    padding: 25,
  },
  height2: {
    height: 'auto',
    transition: '1s ease-in-out',
  },
  titleCard: {
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.palette.success.main,
    marginBottom: 6,
  },
  description: {
    fontWeight: 'bold',
  },
  icons: {
    marginTop: 5,
    display: 'flex',
  },
  logoItemDescription: {
    display: 'flex',
    paddingRight: 10,
  },
  textLogo: {
    paddingLeft: 10,
  },
  leftInfo: {
    flex: 1,
  },
  rightInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: 223,
  },
  favorisText: {
    color: theme.palette.success.main,
    fontWeight: 14,
    display: 'flex',
    alignItems: 'center',
  },
  heartLogo: {
    paddingLeft: 4,
  },
  btnContainer: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  btnLabel: {
    color: '#011A5E',
    fontWeight: 'bold',
    fontSize: 18,
  },
  extends: {
    width: '100%',
    height: 'auto',
  },
  headerInfo: {
    backgroundColor: '#ffe9c3',
    height: 182,
    padding: '23px 23px 0px 23px',
    position: 'relative',
  },
  arrow: {
    transform: 'rotate(-90deg)',
    position: 'absolute',
    top: 20,
    right: 20,
    cursor: 'pointer',
  },
  infoExtended: {
    display: 'flex',
    width: '100%',
  },
  item: {
    width: '33.33%',
  },
  itemTitle: {
    fontWeight: 'bold',
  },
  logoContainer: {
    display: 'flex',
    marginTop: 10,
  },
  logoItem: {
    display: 'flex',
    width: '33.33%',
    cursor: 'pointer',
    alignItems: 'center',
  },
  titleLogo: {
    fontWeight: 'bold',
    fontSize: 14,
    color: theme.palette.primary.main,
    paddingLeft: 15,
  },
}));
