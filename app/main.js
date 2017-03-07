/**
*
* app/main.js
* Main
*
**/

import 'style/fonts.styl'; // Must be imported separatly to the base

// BUG .pug file do not auto reloading
// https://github.com/jantimon/html-webpack-plugin/issues/100
if (process.env.NODE_ENV === 'development') {
  require('./views/index.pug');
  require('./views/contact.pug');
}
