import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';

export const testSetupProvider = (initialProps = {}) => {
  return function setup(ComponentToShallow, props = {}) {
    const currentProps = Object.assign({}, initialProps, props);

    return shallow(<ComponentToShallow {...currentProps} />);
  };
};

export const mockStore = configureStore([thunk]);
