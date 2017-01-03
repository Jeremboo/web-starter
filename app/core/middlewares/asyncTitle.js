import {
  requestTitle,
  successTitle,
} from 'core/actions/asyncTitle';

const fetchTitle = () => dispatch => {
  dispatch(requestTitle());
  setTimeout(
     () => {
       dispatch(successTitle('Hello World'));
     }, 1000);
};

export const getTitle = () => (dispatch, getState) => {
  const { title } = getState();
  if (title !== '' && title !== '....') {
    return title;
  }
  return dispatch(fetchTitle());
};
