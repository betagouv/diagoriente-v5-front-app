import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme, { isCampus?: boolean }>({
  header: {
    backgroundColor: (props) => props.isCampus ? '#19194b' : 'transparent',
    boxShadow: 'none',
  },
});
