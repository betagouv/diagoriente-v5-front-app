import { makeStyles, Theme } from '@material-ui/core/styles';
import Yellowarrow from 'assets/svg/fleche_jaune-claire.svg';
import darkYellowrrow from 'assets/svg/fleche_jaune.svg';
import bluearrow from 'assets/svg/bluearrow.svg';
import darkbluearrow from 'assets/svg/darkbluearrow.svg';

export default makeStyles<Theme, { select: string }>((theme: Theme) => ({
  root: {
    border: '1px solid #C9C9C7',
    boxSizing: 'border-box',
    borderRadius: 15,
    marginTop: 40,
    marginBottom: 40,
  },
  header: {
    display: 'flex',
    width: '100%',
    height: 74,
  },
  empty: {
    width: 330,
  },
  titleJobCompetence: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#DB8F00',
    width: '50%',
    borderRadius: '15px 0px 0px 0px',
    backgroundColor: (props) => (props.select === 'jobCompetence' ? '#fff' : '#F3F2F4'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  titleParcoursCompetence: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#00B2DB',
    backgroundColor: (props) => (props.select === 'parcoursCompetence' ? '#fff' : '#F3F2F4'),
    borderRadius: '0px 15px 0px 0px',
    cursor: 'pointer',
  },
  echelonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    alignSelf: 'flex-start',
    padding: 30,
  },
  echelonTitle: {
    fontSize: 14,
    flex: '1 1 0%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 900,
  },

  echelon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 65,
    paddingBottom: 15,
  },

  competenceTitle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 0,
    paddingRight: 30,
    width: 335,
    color: '#424242',
    fontSize: 18,
  },

  competencesContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  competencesValues: {
    display: 'flex',
    width: '100%',
    paddingBottom: 10,
    paddingLeft: 30,
    '&:last-child': {
      paddingBottom: 36,
    },
  },
  competencesValuesNotExist: {
    display: 'flex',
    width: '100%',
    paddingBottom: 10,
    paddingLeft: 30,
    '&:last-child': {
      paddingBottom: 36,
    },
    opacity: 0.5,
  },
  arrowEchelon: {
    position: 'relative',
    display: 'flex',
    backgroundImage: `url(${Yellowarrow})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    alignItems: 'center',
    width: 685,
    height: 67,
    cursor: 'pointer',
  },

  darkArrowEchelon: {
    position: 'absolute',
    backgroundImage: `url(${darkYellowrrow})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    top: 1,
    left: 0,
    bottom: 0,
    height: 90,
  },

  arrow: {
    paddingTop: 6,
  },
  arrowEchelonBlue: {
    position: 'relative',
    display: 'flex',
    backgroundImage: `url(${bluearrow})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    alignItems: 'center',
    width: 685,
    height: 67,
    cursor: 'pointer',
  },

  darkArrowEchelonBlue: {
    position: 'absolute',
    backgroundImage: `url(${darkbluearrow})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    top: 2,
    left: 0,
    bottom: 0,
    height: 85,
  },
}));
