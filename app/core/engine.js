import {
  AmbientLight,
  AxisHelper, GridHelper, PointLightHelper,
  PerspectiveCamera, CameraHelper,
} from 'three';

import OrbitControls from 'vendors/OrbitControls';

import Webgl from 'core/Webgl';
import gui from 'core/gui';
import loop from 'core/loop';
import props from 'core/props';

import Exemple from 'components/Exemple';

class Engine {
  constructor() {
    this.webgl = false;
    this.helperEnabled = false;
    this.onResize = false; // Callback of onResize listener

    // objects
    this.lights = [];
    this._exemple = false;

    this.init = this.init.bind(this);
    this.initWebgl = this.initWebgl.bind(this);
    this.initObjects = this.initObjects.bind(this);
    this.loadAssets = this.loadAssets.bind(this);
    this._resize = this._resize.bind(this);

    this.toggleHelper = this.toggleHelper.bind(this);

    // TOGGLE HELPER
    // TODO make code combinaison
    if (process.env.NODE_ENV === 'development') {
      document.addEventListener('keydown', (e) => {
        if (e.keyCode === 192) {
          this.toggleHelper();
        }
      });
    }
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
    return new Promise((resolve) => {
      if (!props.debug.disableWebgl || process.env.NODE_ENV === 'production') {
        try {
          // Start webgl
          this.webgl = new Webgl(window.innerWidth, window.innerHeight);
          this.webgl.dom.style.position = 'fixed';
          this.webgl.dom.style.top = 0;
          this.webgl.dom.style.left = 0;
          this.webgl.dom.style.zIndex = -1;
          document.body.appendChild(this.webgl.dom);

          loop.start();

          // Add on resize for webgl
          window.addEventListener('resize', this._resize);
          window.addEventListener('orientationchange', this._resize);
        } catch (e) {
          // HACK fake webgl
          this.webgl = false;
        }
      }

      resolve();
    });
  }

  loadAssets() {
    return new Promise((resolve, reject) => {

        resolve();
    });
  }

  initObjects() {
    return new Promise((resolve) => {
      if (this.webgl) {
        // TODO add main object add scene
        // TODO scene.js

        // LIGHT
        const ambiantLight = new AmbientLight(0xffffff, 0.5);
        this.webgl.add(ambiantLight);

        // OBJECTS
        this._exemple = new Exemple();
        this.webgl.add(this._exemple);

      } else {
        // If no GL
      }

      if (!props.debug.disableWebgl && props.debug.webglHelper && process.env.NODE_ENV !== 'production') {
        this.toggleHelper();
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
      // TODO helper into an other file
      if (!gui.enabled) {
        gui.initGui();

        // Add objects into helper

        // Lights
        this.lightsHelper = [];
        for (let i = 0; i < this.lights.length; i++) {
          this.lightsHelper.push(new PointLightHelper(this.lights[i], 10));
          gui.addLight(this.lights[i]);
        }
      }
      if (!this.gridHelper) this.gridHelper = new GridHelper(200, 200);
      if (!this.axisHelper) this.axisHelper = new AxisHelper(300);

      if (!this.debugCamera) {
        this.debugCamera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
        this.debugCamera.position.z = 150;
        this.controls = new OrbitControls(this.debugCamera, this.webgl.dom);
      }

      if (!this.cameraHelper) this.camerahelper = new CameraHelper(this.webgl.camera);

      gui.toggleHide();

      document.querySelector('.dg.ac').style.zIndex = 10;
      this.webgl.dom.style.zIndex = 9;
      this.webgl._renderer.setClearColor(0xaaaaaa, 1);

      this.webgl.add(this.gridHelper);
      this.webgl.add(this.axisHelper);
      this.webgl.add(this.debugCamera);
      this.webgl.add(this.camerahelper);

      this.webgl.currentCamera = this.debugCamera;

    } else {
      gui.toggleHide();

      this.webgl.dom.style.zIndex = -1;
      this.webgl._renderer.setClearColor(0xfefefe, 1);

      this.webgl.remove(this.gridHelper);
      this.webgl.remove(this.axisHelper);
      this.webgl.remove(this.debugCamera);
      this.webgl.remove(this.camerahelper);

      this.webgl.currentCamera = this.webgl.camera;
      for (let i = 0; i < this.lightsHelper.length; i++) {
        this.webgl.remove(this.lightsHelper[i]);
      }
    }
  }

  /**
   ****************
   * LISTENERS
   ****************
   */
  _resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (typeof (this.onResize) === 'function') this.onResize(w, h);
    this.webgl.resize(w, h);

    props.isMobile = window.innerWidth < 600;
  }
}

export default new Engine();
