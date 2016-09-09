/**
*
* app/core/utils.js
* Util generic functions.
*
**/

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    return (
      reducer
      ? reducer(state, action.payload)
      : state
    );
  };
}
