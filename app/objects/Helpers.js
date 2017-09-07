import {
  AxisHelper, GridHelper, PointLightHelper,
  PerspectiveCamera, CameraHelper, Object3D,
} from 'three';

import OrbitControls from 'vendors/OrbitControls';

import gui from 'core/gui';

export default class Helpers extends Object3D {
  constructor(webgl) {
    super();
    // GRID & AXIS
    this.gridHelper = new GridHelper(200, 200);
    this.add(this.gridHelper);
    this.axisHelper = new AxisHelper(300);
    this.add(this.axisHelper);

    // LIGHTS
    // this.lightsHelper = [];
    // for (let i = 0; i < this.lights.length; i++) {
    //   this.lightsHelper.push(new PointLightHelper(this.lights[i], 10));
    //   this.add(this.lightsHelper);
    //   gui.addLight(this.lights[i]);
    // }

    // CAMERA
    this.cameraHelper = new CameraHelper(webgl.currentCamera);
    this.add(this.cameraHelper);
    this.debugCamera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    this.debugCamera.position.set(webgl.camera.position.clone());
    webgl.add(this.debugCamera);
    this.controlsDebugCamera = new OrbitControls(this.debugCamera, document.getElementById('app'));
  }
}
