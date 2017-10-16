import { Mesh, Vector4, TetrahedronGeometry, ShaderMaterial } from 'three'

import props from 'core/props';
import gui from 'core/gui';

import vertexShader from 'webgl/shaders/example.v.glsl';
import fragmentShader from 'webgl/shaders/example.f.glsl';


export default class Example extends Mesh {
  constructor() {

    const geometry = new TetrahedronGeometry(10, 0);
    const material = new ShaderMaterial({
      uniforms: {
        color: {
          type: 'v4',
          value: new Vector4(0.9, 0.715, 0.072, 1) },
      },
      vertexShader,
      fragmentShader,
      // wireframe: true,
    });

    super(geometry, material);

    this.update = this.update.bind(this);

    // helper
    gui.add(props, 'ROTATION_SPEED', 0, 1);
  }

  update() {
    this.rotation.x += props.ROTATION_SPEED;
    this.rotation.y += props.ROTATION_SPEED;
  }
}
