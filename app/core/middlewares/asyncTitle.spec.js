import expect from 'expect';
import { mockStore } from 'core/testSetup';

import { getTitle, fetchTitle } from './asyncTitle.js';

// TODO update tests, see :
// http://redux.js.org/docs/recipes/WritingTests.html
// https://github.com/arnaudbenard/redux-mock-store
// https://github.com/reactjs/redux/issues/1716

describe('Middleware title', function() {

  it('should return a function', function() {
    expect(getTitle()).toBeA('function');
  });

  // TODO it should fetch the title


  const initialState = {
    title: 'salut',
  };
  const store = mockStore(initialState);

  it('should return directly the title', function() {
    expect(store.dispatch(getTitle())).toEqual(initialState.title);
  });
});
