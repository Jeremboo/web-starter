// TODO remplaced by https://github.com/acdlite/redux-actions

function makeActionCreator(type, ...argNames) {
  return (...args) => {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

// ACTIONS NAME
export const TODO = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
};
export const VISIBILITY_FILTER = {
  SET_VISIBILITY_FILTER: 'SET_VISIBILITY_FILTER',
  SWITCH_VISIBILITY_FILTER: 'SWITCH_VISIBILITY_FILTER',
};

// ACTIONS
export const addTodo = makeActionCreator(TODO.ADD_TODO, 'id', 'text');
export const toggleTodo = makeActionCreator(TODO.TOGGLE_TODO, 'id');

export const switchVisibilityFilter = makeActionCreator(
  VISIBILITY_FILTER.SWITCH_VISIBILITY_FILTER,
  'filter'
);
