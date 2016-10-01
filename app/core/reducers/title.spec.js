import expect from 'expect';
import { successTitle } from 'core/actions/title';
import title from './title';

describe('Reducer title', function() {

  it('should return empty sting', function() {
    expect(title(undefined, { type: '' })).toEqual('');
  });

  const testTitle = 'test';
  it(`should return ${testTitle} string`, function() {
    expect(title('', successTitle(testTitle)));
  });
});
