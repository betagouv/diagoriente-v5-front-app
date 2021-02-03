import createLazyComponent from 'utils/createLazyComponent';

// all containers should exported with lazy
export default createLazyComponent(() => import('./Game'));
