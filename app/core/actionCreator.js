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
export const TEXT = {
  SET_TEXT: 'SET_TEXT',
};

// ACTIONS
export const setText = makeActionCreator(TEXT.SET_TEXT, 'text');
