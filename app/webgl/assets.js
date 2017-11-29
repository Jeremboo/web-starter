import {
  JSONLoader, FontLoader, TextureLoader, CubeTextureLoader,
} from 'three';

import props from 'core/props';

/**
****************
* EXPORT
****************
*/
const assets = {}
export default assets

/**
****************
* INIT THE LOADING PROCESS
****************
*/

/* List of assets to load */
// WARNING load and parse object makes freeze
// TODO just load the .json and parse after
const OBJECT_ASSETS = [
  // { name: 'obj', url: require('../assets/objects/obj.json') },
];
const FONT_ASSETS = [
  // { name: 'font', url: require('../assets/objects/fonts/font.json') },
];
const TEXTURE_ASSETS = [
    // { name: 'texture', url: require('../assets/imgs/texture.jpg') },
];
const CUBE_TEXTURE_ASSETS = [
  // { name: 'cubeTextures', url: [
  //   require('../assets/imgs/px.jpg'),
  //   require('../assets/imgs/nx.jpg'),
  //   require('../assets/imgs/py.jpg'),
  //   require('../assets/imgs/ny.jpg'),
  //   require('../assets/imgs/pz.jpg'),
  //   require('../assets/imgs/nz.jpg'),
  // ]},
];


/**
 ****************
 * LOADERS
 ****************
 */
 /* The array who will contain all assets */
const loadingPromiseArr = [];

/* Init all loaders */
const load = (filename, progress = f => f, loader) => new Promise((resolve, reject) => {
  loader.load(filename, (...data) => {
    resolve(...data);
  }, progress, reject);
})
const jsonLoader = new JSONLoader();
const loadJSON = (file, progress) => load(file, progress, jsonLoader);
const fontLoader = new FontLoader(); // https://gero3.github.io/facetype.js/
const loadFont = (file, progress) => load(file, progress, fontLoader);
const textureLoader = new TextureLoader();
const loadTexture = (file, progress) => load(file, progress, textureLoader);
const cubeTextureLoader = new CubeTextureLoader();
const loadCubeTexture = (arrFileName, progress) => load(arrFileName, progress, cubeTextureLoader);

/* Userfull methods to parse assets and save promises to load them after */
const createLoadingPromise = (promise, name, url) => {
  loadingPromiseArr.push({ promise, url, name });
};
const createLoadingPromisePerType = (assetList, loader) => {
  let i;
  const l = assetList.length;
  for (i = 0; i < l; i++) {
    createLoadingPromise(loader, assetList[i].name, assetList[i].url);
  }
};

/* Build all promises */
createLoadingPromisePerType(OBJECT_ASSETS, loadJSON);
createLoadingPromisePerType(TEXTURE_ASSETS, loadTexture);
createLoadingPromisePerType(FONT_ASSETS, loadFont);
createLoadingPromisePerType(CUBE_TEXTURE_ASSETS, loadCubeTexture);

/**
 ****************
 * LOAD ALL ASSETS ASYNCRONOUSLY
 ****************
 */
export const loadAssets = async () => {
  // Init the loading value props
  const nbrOfAssetsToLoad = loadingPromiseArr.length;
  const persentSolvedPerAssets = 100 / nbrOfAssetsToLoad;

  for (let i = 0; i < nbrOfAssetsToLoad; i++) {
    const { promise, url, name } = loadingPromiseArr[i];

    try {
      let loadingProgress = 0;
      const result = await promise(url, (v) => {
        const { loaded, total } = v;
        const progress = persentSolvedPerAssets * (loaded / total);
        // loader.incrementLoader(progress - loadingProgress);
        loadingProgress = progress;
      })
      //  loader.incrementLoader(persentSolvedPerAssets - loadingProgress)
      assets[name] = result;
    } catch (e) {
      // TODO purpose fake data
      assets[name] = false;
    }
    // Force update progress
    // loader.setLoader(persentSolvedPerAssets * (i + 1));
  }
};
