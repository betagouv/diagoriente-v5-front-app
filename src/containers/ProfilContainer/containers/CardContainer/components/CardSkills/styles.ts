import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  skillsContainer: { marginTop: 16 },
  emptyMessage: {
    marginTop: 25,
    fontSize: 18,
    lineHeight: '29px',
    marginBottom: 18,
  },
  emptyButton: {
    backgroundColor: '#00CFFF',
    borderRadius: 10,
    color: '#223A7A',
    fontSize: 18,
    boxShadow: 'none',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#00B2DB',
      color: '#011A5E',
    },
  },
});
