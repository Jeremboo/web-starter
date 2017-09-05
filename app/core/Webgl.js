import {
  Scene, PerspectiveCamera, WebGLRenderer, PCFSoftShadowMap,
  Clock,
} from 'three';
import {
  EffectComposer, RenderPass, BloomPass,
} from 'postprocessing';

import OrbitControls from 'vendors/OrbitControls';

import props from 'core/props';
import gui from 'core/gui';
import loop from 'core/loop';

const clock = new Clock();

export default class Webgl {
  constructor(w, h) {
    this.width = w;
    this.height = h;
    this.scene = new Scene();
    // this.scene.fog = new Fog(0xFEFEFE, 0.5, 20);

    this.camera = new PerspectiveCamera(50, w / h, 1, 1000);
    this.camera.position.set(0, 0, 50);
    this.currentCamera = this.camera;

    this._renderer = new WebGLRenderer({
      antialias: true,
    });
    // this._renderer.setPixelRatio(window.devicePixelRatio || 1);
    this._renderer.setClearColor(0xFEFEFE, 1);
    // this._renderer.shadowMap.enabled = true;
    // this._renderer.shadowMap.type = PCFSoftShadowMap;

    this.dom = this._renderer.domElement;

    if (props.debug.orbitControlsMainCamera && process.env.NODE_ENV !== 'production') {
      this.controls = new OrbitControls(this.currentCamera, document.body);
    }

    this._composer = false;
    this._passes = {};
    if (!props.debug.postProcess.disabled || process.env.NODE_ENV === 'production') {
      this.initPostprocessing();
    }

    this.initPostprocessing = this.initPostprocessing.bind(this);
    this.update = this.update.bind(this);
    this.resize = this.resize.bind(this);

    loop.add('0000', this.update);
    this.resize(w, h);
  }

  initPostprocessing() {
    this._composer = new EffectComposer(this._renderer, {
      // stencilBuffer: true,
			// depthTexture: true,
    });
    gui.add(props.debug.postProcess, 'disabled').onChange(() => {
      // TODO : disable all passes
      this._passes.bloomPass.enabled = !props.debug.postProcess.disabled;

      // RenderToScreen for the renderPass
      this._composer.passes[0].renderToScreen = props.debug.postProcess.disabled;
    });

    // PASSES
    const renderPass = new RenderPass(this.scene, this.currentCamera);
    this._composer.addPass(renderPass);

    // Bloom
    this._passes.bloomPass = new BloomPass({
      resolutionScale: 0.5,
      intensity: 2.0,
      distinction: 4.0,
    });
    this._passes.bloomPass.renderToScreen = true;
    this._composer.addPass(this._passes.bloomPass);
  }

  add(mesh, _id) {
    const id = _id || mesh.uuid;
    if (!id) {
      console.log('ERROR: Webgl.add(): need an id');
      return;
    }
    this.scene.add(mesh);
    if (!mesh.update) return;
    loop.add(id, () => { mesh.update(); });
  }

  remove(mesh, id) {
    this.scene.remove(mesh);
    if (!mesh.update) return;
    loop.remove(id || mesh.uuid, () => { mesh.update(); });
  }

  update() {
    if (this._composer) {
      this._composer.render(clock.getDelta());
      return;
    }

    this._renderer.render(this.scene, this.currentCamera);
  }

  resize(w, h) {
    this.width = w;
    this.height = h;

    this.currentCamera.aspect = w / h;
    this.currentCamera.updateProjectionMatrix();

    this._renderer.setSize(w, h);

    if (!props.debug.postProcess.disabled || process.env.NODE_ENV === 'production') {
     this._composer.setSize(w, h);
    }
  }
}
