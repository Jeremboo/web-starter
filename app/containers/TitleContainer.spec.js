import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';

import TitleContainer from './TitleContainer';

describe('<TitleContainer />', function() {
  it('Should have one <Title /> component', function() {
    expect(shallow(<TitleContainer />).find('<Title />'));
  });

  // TODO add another tests
});
