import React from 'react';
import { expect } from 'chai';
import testSetupProvider from 'core/testSetup';

import { TitleContainer } from './TitleContainer';

const setup = testSetupProvider({
  text: '..',
  onTextReceived: () => 'executed', // TODO to review
}
);

describe('TitleContainer', function() {
  const titleContainerShallow = setup(TitleContainer);

  it('Should have a <Title /> component', function() {
    expect(titleContainerShallow.find('<Title />'));
  });

  it('Should have a string text props', function() {
    expect(titleContainerShallow.props().text).to.equal('...');
  });

  // TODO add another tests
});
