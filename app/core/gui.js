
import dat from 'dat-gui';

import props from 'core/props';

const gui = new dat.GUI();

const rotationSpeed = gui.add(props, 'rotationSpeed', 0, 1);

// PostProcess
const postProcessFolder = gui.addFolder('PostProcess');
postProcessFolder.add(props.postProcess, 'enabled');

gui.close();
