import { TEXT } from 'core/actionCreator.js';

const { SET_TEXT } = TEXT;

const text = (state = '...', action) => {
  switch (action.type) {
    case SET_TEXT:
      return action.text;
    default:
      return state;
  }
};

export default text;
