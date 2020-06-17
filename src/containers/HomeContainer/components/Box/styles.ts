import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { color: string; colorText: string }>((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 473,
    height: 331,
    background: '#fff',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
  },
  logoContainer: {
    height: 61,
    width: 61,
  },
  titleBox: {
    fontFamily: 'ocean',
    fontWeight: 900,
    fontSize: 45,
    marginTop: 20,
    color: (props) => props.colorText,
  },
  subTitleBox: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    whiteSpace: 'pre-wrap',
  },
  btn: {
    backgroundColor: (props) => props.color,
    width: 220,
    marginTop: 20,
    '&:hover': {
      backgroundColor: (props) => props.color,
    },
  },
  btnLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
}));
