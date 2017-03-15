
import dat from 'dat-gui';

import props from 'core/props';

const gui = new dat.GUI();

// PostProcess
const postProcessFolder = gui.addFolder('PostProcess');
postProcessFolder.add(props.postProcess, 'enabled');

gui.close();
