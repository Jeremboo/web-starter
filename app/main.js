import React from 'react';
import ReactDOM from 'react-dom';

import createStore from 'core/createStore';

import Root from 'views/Root';

// Enable react dev-tools (https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
window.React = React;

const initialState = {};
const store = createStore(initialState);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('app')
);
