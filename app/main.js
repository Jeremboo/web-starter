/**
*
* app/main.js
* Main
*
**/

import { start } from 'core/barbaExtend';

import 'style/fonts.styl';
import 'style/base.styl';

// START
let i;
const views = process.env.VIEWS;

for (i = 0; i < views.length; i++) {
  require(`./views/${views[i]}/index.js`);
}

start();

// BUG .pug file do not auto reloading
// https://github.com/jantimon/html-webpack-plugin/issues/100
// fixed with theres lines
if (process.env.NODE_ENV === 'development') {
  for (i = 0; i < views.length; i++) {
    require(`./views/${views[i]}/index.pug`);
  }
}
