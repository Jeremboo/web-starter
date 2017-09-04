import {
  PointLight, AmbientLight,
  AxisHelper, GridHelper, PointLightHelper, Vector3,
  PerspectiveCamera, CameraHelper
} from 'three';

import OrbitControls from 'vendors/OrbitControls';

import Webgl from 'core/Webgl';
import gui from 'core/gui';
import loop from 'core/loop';
import props from 'core/props';

import Helpers from 'objects/Helpers';
import Exemple from 'objects/Exemple';

class Engine {
  constructor() {
    this.webgl = false;
    this.helpers = false;
    this.helperEnabled = false;
    this.onResize = f => f;
    this.onToggleHelper = f => f;

    this.init = this.init.bind(this);
    this.toggleHelper = this.toggleHelper.bind(this);

    this._initWebgl = this._initWebgl.bind(this);
    this._initObjects = this._initObjects.bind(this);
    this._loadAssets = this._loadAssets.bind(this);

    this._resize = this._resize.bind(this);
  }

  /**
   ****************
   * INIT
   ****************
   */
  init() {
    return this._initWebgl()
      .then(this._loadAssets)
      .then(this._initObjects)
      .then(() => {
        // HELPERS
        // TODO make code combinaison
        if (process.env.NODE_ENV === 'development') {
          this.helpers = new Helpers(this.webgl);
          document.addEventListener('keydown', (e) => {
            if (e.keyCode === 192) {
              this.toggleHelper();
            }
          });
        }

        if (props.debug.webglHelper && process.env.NODE_ENV !== 'production') {
          this.toggleHelper();
        }

        // START
        loop.start();
      })
      .catch((e) => {
        console.log(e);
      })
    ;
  }

  _initWebgl() {
    return new Promise((resolve, reject) => {
      if (!props.debug.disableWebgl || process.env.NODE_ENV === 'production') {
        try {
          // Start webgl
          this.webgl = new Webgl(window.innerWidth, window.innerHeight);
          this.webgl.dom.style.position = 'fixed';
          this.webgl.dom.style.top = 0;
          this.webgl.dom.style.left = 0;
          this.webgl.dom.style.zIndex = -1;
          document.body.appendChild(this.webgl.dom);

          // Add on resize for webgl
          window.addEventListener('resize', this._resize);
          window.addEventListener('orientationchange', this._resize);
        } catch (e) {
          // HACK fake webgl
          this.webgl = false;
          reject(e);
        }
      } else {
        reject('WEBGL DISABLED');
      }

      resolve();
    });
  }

  _loadAssets() {
    return new Promise((resolve, reject) => {

        resolve();
    });
  }

  _initObjects() {
    return new Promise((resolve) => {
      if (this.webgl) {
        // TODO add main object add scene
        // TODO scene.js

        // LIGHT
        const ambiantLight = new AmbientLight(0xffffff, 0.5);
        this.webgl.add(ambiantLight);

        // OBJECTS
        const exemple = new Exemple();
        this.webgl.add(exemple);
      } else {
        // If no GL
      }

      resolve();
    });
  }

  /**
   ****************
   * HELPER
   ****************
   */
  toggleHelper() {
    this.helperEnabled = !this.helperEnabled;
    if (this.helperEnabled) {
      // this.webgl.dom.style.zIndex = 9;
      this.webgl._renderer.setClearColor(0xaaaaaa, 1);
      this.webgl.add(this.helpers);

      this.webgl.currentCamera = this.helpers.debugCamera;
    } else {
      // this.webgl.dom.style.zIndex = -1;
      this.webgl._renderer.setClearColor(0xfefefe, 1);
      this.webgl.remove(this.helpers);

      this.webgl.currentCamera = this.webgl.camera;
    }

    if (this.webgl._composer) {
      this.webgl._composer.passes[0].camera = this.webgl.currentCamera;
    }

    this.onToggleHelper(this.helperEnabled);
    gui.toggleHide();
  }

  /**
   ****************
   * LISTENERS
   ****************
   */
  _resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.onResize(w, h);
    this.webgl.resize(w, h);
  }
}

export default new Engine();
