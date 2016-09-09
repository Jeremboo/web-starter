import React from 'react';
import { expect } from 'chai';
import testSetupProvider from 'core/testSetup';

import TitleContainer from './TitleContainer';

const setup = testSetupProvider();

describe('TitleContainer', function() {
  const titleContainerShallow = setup(TitleContainer);

  it('Should have one <Title /> component', function() {
    expect(titleContainerShallow.find('<Title />'));
  });

  // TODO add another tests
});
