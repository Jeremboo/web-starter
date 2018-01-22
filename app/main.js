/**
*
* app/main.js
* Main
*
* */

import React from 'react';
import ReactDOM from 'react-dom';

import Router from 'components/Router';

import 'style/base.styl';

// Enable react dev-tools (https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
window.React = React;

ReactDOM.render(<Router />, app);
