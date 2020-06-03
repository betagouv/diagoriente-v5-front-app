import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
    container:{
        
    },

  selectRoot: {
    width: 228,
    border: `1px solid #6B6B6A`,
    '&:hover:not(:focus-within)': {
      borderColor: theme.palette.primary.main,
    },
    '&:focus-within': {
      borderColor: theme.palette.primary.main,
    },
    outline: 'none',
  },
  select: {
    width: '100%',
    marginTop: 53,
    marginLeft: -20,
  },
  items: {
    color: 'blue',
  },
}));
