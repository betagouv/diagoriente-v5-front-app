import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    flex: '1 0 auto',
    display: 'flex',
    flexDirection: 'column',
    padding: 70,
    paddingTop: 18,
    backgroundColor: '#E5E5E5',
  },
  header: {
    display: 'grid',
    gridTemplateAreas: `"arrow icons"
                        "title icons"`,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerImage: {
    width: 56,
    marginRight: 25,
  },
  headerTitle: {
    gridArea: 'title',
    display: 'flex',
    alignItems: 'center',
    marginTop: 19,
  },
  title: {
    position: 'relative',
    lineHeight: 1,
    fontSize: 42,
    top: 2,
    color: theme.palette.background.default,
    fontFamily: 'Ocean',
    textTransform: 'uppercase',
  },
  headerIcons: {
    gridArea: 'icons',
    display: 'flex',
  },
  headerIcon: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B6B6A',
    marginLeft: 22,
    cursor: 'pointer',
  },
  headerIconImage: {
    width: 30,
    marginRight: 11,
  },
  card: {
    marginTop: 24,
    display: 'flex',
    flexDirection: 'column',
    padding: 40,
    color: 'inherit',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #6B6B6A',
    paddingBottom: 20,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
  },
  userName: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 18,
  },
  appInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  appLogo: {
    marginRight: 30,
  },
  part: {
    padding: '30px 0',
    borderBottom: '1px solid #6B6B6A',
    display: 'flex',
    flexDirection: 'column',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  competencesPart: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
  },
  subTitle: {
    color: theme.palette.background.default,
    fontSize: 12,
  },
  competences: { marginTop: 25 },
  competenceTitle: {
    marginBottom: 10,
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 'bold',
  },
  competenceNiveau: {
    fontSize: 10,
    width: '100%',
    lineHeight: '13px',
    marginTop: 10,
  },
  emptyCompetences: {
    fontSize: 18,
    lineHeight: '29px',
    marginTop: 17,
  },
  emptyCompetencesBold: { fontWeight: 'bold' },
  skillsContainer: { marginTop: 16 },
  skillHeader: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  themeTitle: {
    flex: '1 1 0%',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: '26px',
    marginLeft: 14,
    display: 'flex',
    alignItems: 'center',
  },
  themeTitlePro:{
    marginLeft: 0,

  },
  titleText: {
    maxWidth: 'calc(100% - 37px)',
  },
  commentIcon: {
    marginLeft: 7,
    width: 30,
  },
  themeIcon: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  activityContainer: {
    marginTop: 9,
    marginLeft: 5,
  },
  activity: {
    fontSize: 10,
    paddingLeft: 6,
    position: 'relative',
    '&:before': {
      backgroundColor: '#424242',
      content: '""',
      height: 3,
      width: 3,
      borderRadius: 1.5,
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      left: 0,
    },
  },
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
  footerIcons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 40,
  },
  tooltip: {
    left: '-10vw !important',
  },
  skill: {
    borderRadius: 10,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(122, 230, 255, 0.2)',
    },
  },
  tooltipContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  tooltipTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: '15px',
    WebkitTextStroke: '0.2px',
  },
  tooltipUser: {
    color: '#7AE6FF',
    textTransform: 'capitalize',
  },
  tooltipLocation: {
    fontWeight: 'normal',
  },
  tooltipCommentText: {
    fontSize: 12,
    marginTop: 13,
  },
}));
