import { VISIBILITY_FILTER } from 'core/actionCreator.js';

const { SET_VISIBILITY_FILTER, SWITCH_VISIBILITY_FILTER } = VISIBILITY_FILTER;

const FILTER_NAMES = ['SHOW_COMPLETED', 'SHOW_ACTIVE', 'SHOW_ALL'];
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    case SWITCH_VISIBILITY_FILTER:
      const indexFilterName = FILTER_NAMES.indexOf(state) < (FILTER_NAMES.length - 1) ?
        (FILTER_NAMES.indexOf(state) + 1) :
        0
      ;
      return FILTER_NAMES[indexFilterName];
    default:
      return state;
  }
};

export default visibilityFilter;
