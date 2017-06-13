/**
*
* app/main.js
* Main
*
**/

import React from 'react';
import ReactDOM from 'react-dom';

import Root from 'core/router';

import 'style/base.styl';

// Enable react dev-tools (https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
window.React = React;

ReactDOM.render(<Root />, app);
