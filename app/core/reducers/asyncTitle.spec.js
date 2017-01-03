import expect from 'expect';

import { successTitle } from 'core/actions/asyncTitle';
import title from 'core/reducers/asyncTitle';

describe('Reducer title', function() {

  it('should return empty sting', function() {
    expect(title(undefined, { type: '' })).toEqual('');
  });

  const testTitle = 'test';
  it(`should return ${testTitle} string`, function() {
    expect(title('', successTitle(testTitle)));
  });
});
