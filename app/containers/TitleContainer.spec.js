import React from 'react';
import expect from 'expect';
import { testSetupProvider } from 'core/testSetup';

import { TitleContainer } from './TitleContainer';

const initialProps = {
  title: '...',
  dispatch: expect.createSpy(),
};
const setup = testSetupProvider(initialProps);

describe('Container TitleContainer', function() {
  const titleContainerShallow = setup(TitleContainer);

  it('should have a <Title /> component', function() {
    expect(titleContainerShallow.find('<Title />'));
  });

  it('should have a string text props', function() {
    expect(titleContainerShallow.props().title).toEqual(initialProps.title);
  });

  // TODO add another tests
});
