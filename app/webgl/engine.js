import {
  PointLight, AmbientLight, DirectionalLight, DirectionalLightHelper,
  Mesh, PlaneGeometry, MeshLambertMaterial, Color,
  DoubleSide,
} from 'three';

import OrbitControls from 'vendors/OrbitControls';

import props from 'core/props';
import gui from 'core/gui';
import helper from 'core/helper';
import { radians } from 'core/utils';

import { loadAssets } from 'webgl/assets';
import Webgl from 'webgl/Webgl';

import Helpers from 'webgl/objects/helpers';
import Example from 'webgl/objects/Example';

class Engine {
  constructor() {
    this.webgl = false;
    this.helpers = false;
    this.onResize = f => f;

    this.init = this.init.bind(this);

    this._initWebgl = this._initWebgl.bind(this);
    this._initObjects = this._initObjects.bind(this);

    this._resize = this._resize.bind(this);
  }

  /**
   ****************
   * INIT
   ****************
   */
  // init() {
  //   return this._initWebgl()
  //     .then(() => loadAssets)
  //     .then(this._initObjects)
  //     .catch((e) => {
  //       console.error(e);
  //     })
  //     ;
  // }

  initWebgl() {
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

  loadAssets() {
    return loadAssets();
  }

  initObjects() {
    return new Promise((resolve) => {
      if (this.webgl) {

        /**
         * LIGHTS
         */
        const ambiantLight = new AmbientLight(0xffffff, 1);
        this.webgl.add(ambiantLight);
        const directionalLight = new DirectionalLight(0xfff7d7, 0.9);
        directionalLight.position.set(0, 70, 10);
        this.webgl.add(directionalLight);


        // OBJECTS
        const example = new Example();
        example.position.y = 10;
        this.webgl.add(example);

        // plane
        this.plane = new Mesh(new PlaneGeometry(500, 500, 32), new MeshLambertMaterial({ color: 0xffffff, side: DoubleSide }));
        this.plane.rotation.x = -radians(90);
        this.webgl.add(this.plane);

        /**
         * HELPERS
         */
        if (process.env.NODE_ENV === 'development') {
          // webgl helpers
          this.helpers = new Helpers(this.webgl);
          helper.addToggle(this.helpers.toggle);
          // lights
          gui.add(ambiantLight, 'intensity', 0, 1).name('Ambient intensity');
          this.helpers.addLight(directionalLight, DirectionalLightHelper, 'DirectionalLight');
        }

        /**
        * FIRST OBJECT RENDER
        */
        // To instanciate fisrt time all hidden objects into the scene
        // this.webgl.setFirstMeshesRender([])
        /**
        * START
        */
        this.webgl.start()
      } else {
        // If no GL
      }
      resolve();
    });
  }

  /**
   ****************
   * CONTROLS
   ****************
   */
  startIntroduction() {
    return new Promise((resolve, reject) => {
      if (!this.webgl) resolve();

      this.title.show()
        .then(this.label.show)
        .then(() => {
          this.title.hide();
          this.bottle.show();
          this.label.goToTheBottle();
          // TODO Animate the camera on rotation and return them
        })
        .then(() => {
          console.log('END');
        })
        ;
    });
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
