import { View, pushView } from 'core/barbaExtend';

import './style.styl';

export default class List extends View {
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

pushView('list', List);
