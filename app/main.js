/**
*
* app/main.js
* Main
*
**/

/**
********************
* BOOTSTRAP ZONE
********************
* Bind all .js .pug and .styl files for webpack and
* Create Barba.js views.
* For each views, writes her code into views/[viewName]/index.js NOT HERE
**/
import { start } from 'core/barbaExtend';

import 'style/fonts.styl';
import 'style/base.styl';

let i;
const views = process.env.VIEWS;

require('./views/index/index.js');
for (i = 0; i < views.length; i++) {
  require(`./views/${views[i]}/index.js`);
}

start();

// BUG .pug file do not auto reloading
// https://github.com/jantimon/html-webpack-plugin/issues/100
// fixed with theres lines
if (process.env.NODE_ENV === 'development') {
  require('./views/index/index.pug');
  for (i = 0; i < views.length; i++) {
    require(`./views/${views[i]}/index.pug`);
  }
}

/**
********************
* START
********************
* Global code mecanics
* Use core/utils.js or core/props.js to create global functions or varibles.
**/
