import { REQUEST_TITLE, SUCCESS_TITLE, FAILURE_TITLE } from 'core/actions/title';

import { handleActions } from 'redux-actions';

const title = handleActions({
  REQUEST_TITLE: () => '...',
  SUCCESS_TITLE: (state, action) => action.title,
  FAILURE_TITLE: () => 'error',
}, '');

export default title;
