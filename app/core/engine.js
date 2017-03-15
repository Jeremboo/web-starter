import Webgl from 'core/Webgl';
import gui from 'core/gui';
import loop from 'core/loop';

import Pyramid from 'objects/Pyramid';

class Engine {
  constructor() {
    this.webgl = false;
    this._pyramid = false,

    this.init = this.init.bind(this);
    this.initWebgl = this.initWebgl.bind(this);
    this.initObjects = this.initObjects.bind(this);
    this.loadAssets = this.loadAssets.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  /**
   ****************
   * INIT
   ****************
   */
  init() {
    return this.initWebgl()
      .then(this.loadAssets)
      .then(this.initObjects)
    ;
  }

  initWebgl() {
    return new Promise((resolve, reject) => {
      // Start webgl
      this.webgl = new Webgl(window.innerWidth, window.innerHeight);
      this.webgl.dom.style.position = 'fixed';
      this.webgl.dom.style.top = 0;
      this.webgl.dom.style.left = 0;
      this.webgl.dom.style.zIndex = -1;
      document.body.appendChild(this.webgl.dom);

      // Start render loop
      loop.start();

      // Add on resize for webgl
      window.addEventListener('resize', this.onResize);
      window.addEventListener('orientationchange', this.onResize);

      resolve();
    }).then(this.loadAssets);
  }

  loadAssets() {
    return new Promise((resolve, reject) => {
        // TODO load assets here
        resolve();
    });
  }

  initObjects() {
    return new Promise((resolve, reject) => {
        // TODO add main object add scene

        this._pyramid = new Pyramid();
        this.webgl.add(this._pyramid);
        resolve();
    });
  }

  /**
   ****************
   * WEBGL ROUTER
   ****************
   */


  /**
   ****************
   * LISTENERS
   ****************
   */
  onResize() {
    this.webgl.resize(window.innerWidth, window.innerHeight);
  }
}

export default new Engine();
