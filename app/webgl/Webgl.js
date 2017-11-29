import {
  Scene, PerspectiveCamera, WebGLRenderer, PCFSoftShadowMap,
  Fog, Clock, Vector3,
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
    this.scene.fog = new Fog(0xcccccc, 0.5, 150);

    this.camera = new PerspectiveCamera(50, w / h, 1, 1000);
    this.camera.position.set(0, 50, 100);
    this.camera.lookAt(new Vector3(0, 0, 0));
    this.currentCamera = this.camera;

    this._renderer = new WebGLRenderer({
      antialias: true,
      // alpha: true,
    });
    // this._renderer.setPixelRatio(window.devicePixelRatio || 1);
    this._renderer.setClearColor(0xcccccc, 1);
    // this._renderer.shadowMap.enabled = true;
    // this._renderer.shadowMap.type = PCFSoftShadowMap;

    this.dom = this._renderer.domElement;

    if (props.debug.orbitControlsMainCamera && process.env.NODE_ENV !== 'production') {
      this.controls = new OrbitControls(this.currentCamera, document.getElementById('app'));
    }

    this._composer = false;
    this._passes = {};
    if (!props.debug.postProcess.disabled || process.env.NODE_ENV === 'production') {
      this.initPostprocessing();
    }

    this.initPostprocessing = this.initPostprocessing.bind(this);
    this.update = this.update.bind(this);
    this.resize = this.resize.bind(this);

    this.resize(w, h);
  }

  initPostprocessing() {
    this._composer = new EffectComposer(this._renderer, {
      // stencilBuffer: true,
			// depthTexture: true,
    });

    // *********
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

    // *********
    // GUI
    if (process.env.NODE_ENV !== 'production') {
      const postProcessFolder = gui.addFolder('PostProcess');
      postProcessFolder.add(props.debug.postProcess, 'disabled').name('disable').onChange(() => {
        for (let i = 1; i < this._composer.passes.length; i++) {
          this._composer.passes[i].enabled = !props.debug.postProcess.disabled
        }
        // RenderToScreen for the renderPass
        this._composer.passes[0].renderToScreen = props.debug.postProcess.disabled
      });
    }
  }

  start() {
    loop.add('0000', this.update);
  }

  stop() {
    loop.remove('0000');
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

  changeCamera(camera) {
    this.currentCamera = camera;
    this.resize(this.width, this.height);
    if (this._composer) this._composer.passes[0].camera = this.currentCamera;
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

  // Set an array of Meshes in the scene to compute them a first time.
  setFirstMeshesRender(meshes) {
    let i = 0;
    const l = meshes.length;
    for (i = 0; i < l; i++) {
      this.add(meshes[i]);
    }
    this.update();
    for (i = 0; i < l; i++) {
      this.remove(meshes[i]);
    }
    this.update();
  }
}
