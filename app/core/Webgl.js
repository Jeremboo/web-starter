import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
// import { Composer } from '@superguigui/wagner';
// import FXAAPass from '@superguigui/wagner/src/passes/fxaa/FXAAPass';
// import VignettePass from '@superguigui/wagner/src/passes/vignette/VignettePass';

import props from 'core/props';
import loop from 'core/loop';

export default class Webgl {
  constructor(w, h) {
    this.width = w;
    this.height = h;
    this.scene = new Scene();

    this.camera = new PerspectiveCamera(50, w / h, 1, 1000);
    this.camera.position.z = 10;

    this._renderer = new WebGLRenderer({
      antialias: true,
    });
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setClearColor(0x0c171a);
    this.dom = this._renderer.domElement;

    this._composer = false;
    this._passes = [];
    this.initPostprocessing();

    this.initPostprocessing = this.initPostprocessing.bind(this);
    this.update = this.update.bind(this);
    this.resize = this.resize.bind(this);

    loop.add(this.update);
    this.resize(w, h);
  }

  initPostprocessing() {
    // TODO add postprocess.js add() / remove()
    // this._composer = new Composer(this._renderer);

    // if (!props.postProcess.enabled) return;
    // this._passes.push(new VignettePass({ reduction: 0.5 }));
    // this._passes.push(new FXAAPass({}));
  }

  add(mesh) {
    this.scene.add(mesh);
    if (!mesh.update) return;
    loop.add(mesh.update);
  }

  remove(mesh) {
    console.log('TODO: remove mesh into loop');
    this.remove(mesh);
    if (!mesh.update) return;
    loop.remove(mesh.update);
  }

  update() {
    if (props.postProcess.enabled) {
      this._composer.reset();
      this._composer.renderer.clear();
      this._composer.render(this.scene, this.camera);
      let i;
      for (i = this._passes.length - 1; i >= 0; i--) {
        this._composer.pass(this._passes[i]);
      }
      this._composer.toScreen();
    }

    this._renderer.render(this.scene, this.camera);
  }

  resize(w, h) {
    this.width = w;
    this.height = h;

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    this._renderer.setSize(w, h);

    if (props.postProcess.enabled) {
     this._composer.setSize(this.innerWidth, this.innerHeight);
   }
  }
}
