import {
  AxisHelper, GridHelper, PointLightHelper,
  PerspectiveCamera, CameraHelper, Object3D,
  Vector3, PointlightHelper,
} from 'three';

import OrbitControls from 'vendors/OrbitControls';

import gui from 'core/gui';

export default class Helpers extends Object3D {
  constructor(webgl) {
    super();
    this._webgl = webgl;
    this.lights = [];

    // GRID & AXIS
    this._gridHelper = new GridHelper(200, 200);
    this.add(this._gridHelper);
    this._axisHelper = new AxisHelper(300);
    this.add(this._axisHelper);
    this._cameraHelper = new CameraHelper(this._webgl.camera);
    this.add(this._cameraHelper);

    // DEBUG CAMERA
    this.camera = webgl.camera.clone();
    this.controlsDebugCamera = new OrbitControls(this.camera, this._webgl.dom);

    this.toggle = this.toggle.bind(this);
    this.addLight = this.addLight.bind(this);
  }

  toggle(visible) {
    if (visible) {
      this._webgl.dom.style.zIndex = 9;
      this._webgl._renderer.setClearColor(0xaaaaaa, 1);
      this._webgl.add(this);
      this._webgl.add(this.camera);
      for (let i = 0; i < this.lights.length; i++) {
        this._webgl.add(this.lights[i]);
      }
      this._webgl.changeCamera(this.camera);
    } else {
      this._webgl.dom.style.zIndex = -1;
      this._webgl._renderer.setClearColor(0xcccccc, 1);
      this._webgl.remove(this.camera);
      this._webgl.remove(this);
      for (let i = 0; i < this.lights.length; i++) {
        this._webgl.remove(this.lights[i]);
      }
      this._webgl.changeCamera(this._webgl.camera);
    }
  }

  addLight(light, LightHelper = PointlightHelper, name) {
    this.lights.push(new LightHelper(light));
    gui.addLight(light, name);
  }
}
