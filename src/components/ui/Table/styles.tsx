import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    overflowX: 'auto',
    width: '100%',
  },
  head: {
    background: theme.palette.primary.main,
  },
  headerItem: {
    color: '#fff',
    padding: '7px 16px',
  },
  rowItem: { padding: '7px 16px' },
  paginationWrapper: {
    padding: ' 10px 0',
    borderCollapse: 'separate',
  },
  paginationContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  pagesCount: {
    borderRadius: 5,
    height: 29,
    fontWeight: 500,
    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
  },
}));

export const useIconsStyles = makeStyles((theme) => ({
  icons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  icon: {
    cursor: 'pointer',
    margin: 5,
  },
  checkbox: {
    color: '#011A5E !important',
  },
  edit: {
    color: theme.palette.secondary.main,
  },
  delete: {
    color: theme.palette.error.main,
  },
  deleteMultiple: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
  },
}));
