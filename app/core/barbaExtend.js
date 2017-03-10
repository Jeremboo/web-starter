

import { BaseTransition, Pjax, HistoryManager } from 'barba.js';

// VIEWS
export class View {
  constructor(namespace) {
    this.namespace = namespace;
    this.nextContainerNamespace = false;
    this.prevContainerNamespace = false;
    this.elm = false;
  }

  _loadToExit() {
    return new Promise(this.loadToExit.bind(this));
  }
  loadToExit(resolve, reject) { resolve(); }

  _leave(nextContainerNamespace) {
    this.prevContainerNamespace = this.namespace;
    this.nextContainerNamespace = nextContainerNamespace;
    return new Promise(this.leave.bind(this));
  }
  leave(resolve, reject) { resolve(); }

  _enter(prevContainerNamespace) {
    this.prevContainerNamespace = prevContainerNamespace;
    this.nextContainerNamespace = this.namespace;
    this.elm = document.querySelector(`[data-namespace=${this.namespace}]`);
    return new Promise(this.enter.bind(this));
  }
  enter(resolve, reject) { resolve(); }
}

// ROUTER
export const views = {};
export const pushView = (viewName, Page) => {
  views[viewName] = new Page(viewName);
};


// STATIC
Pjax.getTransition = () => BaseTransition.extend({
  start: function() {
    const oldContainerAttr = this.oldContainer.getAttribute('data-namespace');
    const currentView = views[oldContainerAttr];

    let newContainerAttr = false;

    Promise
      .all([this.newContainerLoading, currentView._loadToExit()])
      .then(() => {
        newContainerAttr = this.newContainer.getAttribute('data-namespace');
        return currentView._leave(newContainerAttr);
      })
      .then(() => this.done())
      .then(() => views[newContainerAttr]._enter(oldContainerAttr))
    ;
  },
});

// START
export const start = () => {
  Pjax.init();
  const currentNamespace = HistoryManager.currentStatus().namespace;
  views[currentNamespace]._enter();
};
