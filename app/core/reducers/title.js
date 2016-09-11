import { REQUEST_TITLE, SUCCESS_TITLE, FAILURE_TITLE } from 'core/actions/title';
import { createReducer } from 'core/utils';

const title = createReducer('', {
  [REQUEST_TITLE]() {
    return '...';
  },
  [SUCCESS_TITLE](state, action) {
    return action.title;
  },
  [FAILURE_TITLE]() {
    return 'error';
  },
});

export default title;
