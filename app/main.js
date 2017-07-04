import {
  AmbientLight,
} from 'three';

import engine from 'core/engine';
import gui from 'core/gui';
import { loadAssets } from 'core/assetLoader';
import props from 'core/props';

import Exemple from 'objects/Exemple';


// TODO show loader

engine.init().then(() => loadAssets).then(() => {
  /** ****************
  * INIT OBJECT
  ******************/


  // TODO Init objects
 // LIGHT
  const ambiantLight = new AmbientLight(0xffffff, 0.5);
  engine.webgl.add(ambiantLight);

  // OBJECTS
  const exemple = new Exemple();
  engine.webgl.add(exemple);


  // TODO Helpers
  gui.add(props, 'rotationSpeed', 0, 1);

  // PostProcess
  // this.postProcessFolder = this.gui.addFolder('PostProcess');
  // this.postProcessFolder.add(props.postProcess, 'enabled');

  engine.onToggleHelper((enabled) => {
    if (enabled) {
      // const lightHelper = new PointLightHelper(this.lights[i], 10);
      // engine.gui.addLight(lightHelper);
      // engine.webgl.add(lightsHelper);
    } else {
      // engine.webgl.remove(lightHelper);
    }
  });

  /** ****************
  * START
  ******************/
  engine.start();
  // TODO hide loader
}).catch((e) => {
  // TODO show error webgl not supported
  console.log(e);
});
