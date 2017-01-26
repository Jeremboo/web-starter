/**
*
* app/store/title.js
* extendObservable: https://mobx.js.org/refguide/extend-observable.html
* computed: https://mobx.js.org/refguide/computed-decorator.html
* action: https://mobx.js.org/refguide/action.html
*
**/

import { extendObservable, computed, action } from 'mobx';


function Title() {
  // Unchangeable
  this.id = Math.random();

  extendObservable(this, {
    name: '...',
    loaded: false,
    all: computed(() => `${this.title} ${this.background}`),
    updateName: action(() => {
      this.loaded = false;
      setTimeout(() => {
        this.name = 'Hello World';
        this.loaded = true;
      }, 1000);
    }),
  });
}

export default new Title();
