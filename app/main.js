/**
*
* app/main.js
* Main
*
**/

import { pushView, start, View } from 'core/barbaExtend';
import 'style/fonts.styl'; // Must be imported separatly to the base

// BUG .pug file do not auto reloading
// https://github.com/jantimon/html-webpack-plugin/issues/100
if (process.env.NODE_ENV === 'development') {
  require('./views/index.pug');
  require('./views/contact.pug');
}

class ClassicPage extends View {
  constructor(namespace) {
    super(namespace);
    this.title = false;
  }

  enter(resolve, reject) {
    this.title = this.elm.querySelector('h1');
    this.title.style.opacity = 1;
    setTimeout(resolve, 200);
  }

  loadToExit(resolve, reject) {
    this.title.style.opacity = 0.5;
    setTimeout(resolve, 200);
  }

  leave(resolve, reject) {
    this.title.style.opacity = 0;
    setTimeout(resolve, 200);
  }
}

// ROUTER
pushView('index', ClassicPage);
pushView('contact', ClassicPage);
pushView('list', ClassicPage);


// START
start();
