import expect from 'expect';
import { REQUEST_TITLE, SUCCESS_TITLE, FAILURE_TITLE } from 'core/actions/title';
import title from './title';

describe('Reducer title', function() {

  it('should return empty sting', function() {
    expect(title(undefined, { type: '' })).toEqual('');
  });

  const action = {
    type: SUCCESS_TITLE,
    title: 'salut',
  };
  it(`should return ${action.title} string`, function() {
    expect(title('', action));
  });
});
