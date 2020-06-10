import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  HEADER_HEIGHT as PUBLIC_HEADER_HEIGHT,
  HEADER_SMALL_HEIGHT as PUBLIC_SMALL_HEADER_HEIGHT,
} from 'components/layout/PublicHeader/styles';
import { HEADER_HEIGHT as PRIVATE_HEADER_HEIGHT } from 'components/layout/PrivateHeader/styles';

const width = window.innerWidth > 768 ? PUBLIC_SMALL_HEADER_HEIGHT : PUBLIC_HEADER_HEIGHT;

export default makeStyles<Theme, { protectedProp?: boolean }>(() => ({
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    width: '100%',
    minHeight: '100vh',
    paddingTop: (props) => (props.protectedProp ? PRIVATE_HEADER_HEIGHT : width),
  },
  page: {
    flex: '1 0 auto',
    justifyContent: 'center',
  },
}));
