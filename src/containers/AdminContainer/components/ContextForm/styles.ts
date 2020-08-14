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
    gridTemplateAreas: '"title title" "icon description"',
    gridGap: 20,
    paddingTop: 5,
  },
  title: {
    gridArea: 'title',
  },
  description: { gridArea: 'description' },
  icons: { gridArea: 'icon' },
  button: {
    height: 44,
    alignSelf: 'center',
    width: '60%',
  },
});
