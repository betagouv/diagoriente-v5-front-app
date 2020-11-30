import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { isCampus?: boolean }>({
  header: {
    backgroundColor: (props) => props.isCampus ? "#3f30b3" : 'transparent',
    boxShadow: 'none',
  },
});
