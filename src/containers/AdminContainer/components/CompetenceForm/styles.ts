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
    gridTemplateColumns: 'auto 100px',
    gridTemplateAreas: '"title title" "type rank" "niveau niveau"',
    gridGap: 20,
    paddingTop: 5,
  },
  title: {
    gridArea: 'title',
  },
  type: { gridArea: 'type' },
  rank: { gridArea: 'rank' },
  niveau: { gridArea: 'niveau' },
  niveauItem: { display: 'grid', gridGap: 20, gridTemplateAreas: '"title subTitle"' },
  subTitle: { gridArea: 'subTitle' },
  button: {
    height: 44,
    alignSelf: 'center',
    width: '60%',
  },
});
