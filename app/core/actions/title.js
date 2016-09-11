import { makeActionCreator } from 'core/utils';

// ACTIONS NAME
export const REQUEST_TITLE = 'REQUEST_TITLE';
export const SUCCESS_TITLE = 'SUCCESS_TITLE';
export const FAILURE_TITLE = 'FAILURE_TITLE';

// ACTIONS
const requestTitle = makeActionCreator(REQUEST_TITLE);
const successTitle = makeActionCreator(SUCCESS_TITLE, 'title');
const failureTitle = makeActionCreator(FAILURE_TITLE, 'error');


// ----- Middleware

const fetchTitle = () => dispatch => {
  dispatch(requestTitle());
  setTimeout(() => Promise.resolve(dispatch(successTitle('Hello World')), 500));
};

export const getTitle = () => (dispatch, getState) => {
  const { title } = getState();
  if (title !== '' && title !== '....') {
    return Promise.resolve(title);
  }
  return dispatch(fetchTitle());
};
