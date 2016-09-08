import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';

import Title from './Title';

describe('<Title />', function() {
  it('<Title text="salut"/> => <h1>salut<h1/>', function() {
    expect(shallow(<Title text="salut" />).contains(<h1>salut</h1>)).to.equals(true);
  });

  it('<Title /> => <h1>...<h1/>', function() {
    expect(shallow(<Title />).contains(<h1>...</h1>)).to.equals(true);
  });
});
