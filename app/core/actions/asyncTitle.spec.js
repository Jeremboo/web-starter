import expect from 'expect';

import {
  SUCCESS_TITLE,
  successTitle,
} from './asyncTitle.js';

describe('Actions title', function() {
  it('successTitle() should return the title', function() {
    const title = 'TEST';
    expect(successTitle(title)).toEqual({
      payload: { title },
      type: SUCCESS_TITLE,
    });
  });
});
