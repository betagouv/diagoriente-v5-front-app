import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  wrapper: {
    flex: '1 1 0',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0',
  },
  container: {
    flex: '1 0 auto',
    display: 'grid',
    gridTemplateAreas: '"title" "parent"',
    gridGap: 20,
    paddingTop: 5,
  },
  title: {
    gridArea: 'title',
  },
  parent: { gridArea: 'parent' },
  button: {
    height: 44,
    alignSelf: 'center',
    width: '60%',
  },
});
