import {
  AmbientLight,
} from 'three';

import engine from 'core/engine';
import gui from 'core/gui';
import props from 'core/props';
import { loadAssets } from 'core/assets';

import Exemple from 'objects/Exemple';

import 'style/base.styl';

// TODO show loader

engine.init().then(() => loadAssets).then(() => {
  /** ****************
  * INIT OBJECT
  ******************/

 // LIGHT
  const ambiantLight = new AmbientLight(0xffffff, 0.5);
  engine.webgl.add(ambiantLight);

  // OBJECTS
  const exemple = new Exemple();
  engine.webgl.add(exemple);

  /** ****************
  * INIT HELPERS
  ******************/
  gui.add(props, 'ROTATION_SPEED', 0, 1);

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
  // TODO shows error if the webgl is not supported
  console.error(e);
});
