import React from 'react';
import expect from 'expect';
import { testSetupProvider } from 'core/testSetup';

import Title from './Title';

const setup = testSetupProvider();

describe('<Title />', function() {
  it('Should return an <h1> containing "salut".', function() {
    const titleShallow = setup(Title, { title: 'salut' });
    expect(titleShallow.contains(<h1>salut</h1>)).toEqual(true);
  });

  it('Should return an <h1> containing "..." when the props are empty>', function() {
    const titleShallow = setup(Title);
    expect(titleShallow.contains(<h1>...</h1>)).toEqual(true);
  });
});
