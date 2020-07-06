import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>((theme) => ({
  immersion: {
    width: 285,
    height: 243,
    background: '#ffe9c3',
    borderRadius: 15,
    position: 'relative',
    padding: 30,
    textAlign: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: -18,
    left: 120,
  },
  titleImersion: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  btnImersionContainer: { position: 'absolute', bottom: -19, left: 86 },
  btnImersion: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  btnLabel: { color: '#011A5E', fontWeight: 'bold' },

  autocompleteContainer: {
    margin: '10px 0px',
  },
}));
