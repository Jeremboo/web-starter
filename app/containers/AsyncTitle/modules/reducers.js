import { handleActions } from 'redux-actions';

import { REQUEST_TITLE, SUCCESS_TITLE, FAILURE_TITLE } from './actions';

const title = handleActions({
  REQUEST_TITLE: () => '...',
  SUCCESS_TITLE: (state, action) => action.payload.title,
  FAILURE_TITLE: () => 'error',
}, '');

export default title;
