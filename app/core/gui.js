
import { GUI } from 'dat-gui';

import props from 'core/props';

class Gui extends GUI {
  constructor() {
    super();
    this.folders = [];

    this.toggle();

    this.addMesh = this.addMesh.bind(this);
    this.addLight = this.addLight.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle(visible) {
    if (visible) {
      this.domElement.offsetParent.style.zIndex = 10;
    } else {
      this.domElement.offsetParent.style.zIndex = 0;
    }
    GUI.toggleHide();
  }

  /**
   * *********
   * ADD
   * *********
   */

  // add light to move her
  addLight(light, name = `Light-${light.uuid}`, params) {
    props.rotation = props.rotation || false;
    const lightFolder = this._addObject3D(light, name, params);
    if (light.power) lightFolder.add(light, 'power', 0, 25.132741229);
    if (light.intensity) lightFolder.add(light, 'intensity', 0, 1);
  }

  // add mesh to move him
  addMesh(mesh, name = `Mesh-${mesh.uuid}`, params) {
    const meshFolder = this._addObject3D(mesh, name, params);
  }

  /**
   * *********
   * PRIVATE
   * *********
   */
  _addObject3D(object, name = `Object3D-${object.uuid}`, { position = true, rotation = true } = props) {
    if (!this) {
      console.log('ERROR: the gui is not initialised');
      return false;
    }

    const objectFolder = this.addFolder(name);

    if (position) {
      const posFolder = objectFolder.addFolder('Position');
      posFolder.add(object.position, 'x', -100, 100);
      posFolder.add(object.position, 'y', -100, 100);
      posFolder.add(object.position, 'z', -100, 100);
    }

    if (rotation) {
      const rotFolder = objectFolder.addFolder('Rotation');
      rotFolder.add(object.rotation, 'x', -Math.PI, Math.PI);
      rotFolder.add(object.rotation, 'y', -Math.PI, Math.PI);
      rotFolder.add(object.rotation, 'z', -Math.PI, Math.PI);
    }

    // TODO scale folder

    return objectFolder;
  }
}
export default new Gui();
