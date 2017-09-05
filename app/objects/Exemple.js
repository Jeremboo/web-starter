import { Object3D, Vector4, TetrahedronGeometry, ShaderMaterial, Mesh } from 'three'

import props from 'core/props';
import gui from 'core/gui';

import vertexShader from 'shaders/example.v.glsl';
import fragmentShader from 'shaders/example.f.glsl';


export default class Exemple extends Object3D {
  constructor() {
    super();

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

    this.mesh = new Mesh(geometry, material);

    this.add(this.mesh);

    this.update = this.update.bind(this);
  }

  update() {
    this.rotation.x += props.ROTATION_SPEED;
    this.rotation.y += props.ROTATION_SPEED;
  }
}
