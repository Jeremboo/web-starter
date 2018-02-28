import {
  JSONLoader, FontLoader, TextureLoader, CubeTextureLoader,
} from 'three';
import OBJLoader from 'vendors/OBJLoader';
import MTLLoader from 'vendors/MTLLoader';
import BytesLoader from 'vendors/BytesLoader';

/* List of assets to load */
// WARNING load and parse object makes freeze
// TODO just load the .json and parse after
const OBJECT_ASSETS_OBJ = [
  // { name: 'obj', url: require('../assets/objects/object.obj') },
];
const MTL_ASSETS = [
  // { name: 'mtl', url: require('../assets/objects/mtlFile.mtl') },
];
const OBJECT_ASSETS_JSON = [
  // { name: 'objjson', url: require('../assets/objects/objjson.json') },
];
const OBJECT_ASSETS_BIN = [
  // { name: 'objbin', url: require('../assets/objects/objbin.bin') },
];
const FONT_ASSETS = [
  // { name: 'font', url: require('../assets/objects/fonts/font.json') },
];
const TEXTURE_ASSETS = [
  // { name: 'texture', url: require('../assets/imgs/texture.jpg') },
];
const CUBE_TEXTURE_ASSETS = [
  // { name: 'bottleGlass',
  //   url: [
  //     require('../assets/imgs/px.png'),
  //     require('../assets/imgs/nx.png'),
  //     require('../assets/imgs/py.png'),
  //     require('../assets/imgs/ny.png'),
  //     require('../assets/imgs/pz.png'),
  //     require('../assets/imgs/nz.png'),
  //   ] },
];

/**
 * Asset Manager
 */
class Assets {
  constructor() {
    this.assets = [];
    this.progress = 0;

    this._loadingPromiseArr = [];
    this._onProgressUpdate = f => f;

    this._objLoader = new OBJLoader();
    this._mtlLoader = new MTLLoader();
    this._jsonLoader = new JSONLoader();
    this._byteLoader = new BytesLoader();
    this._fontLoader = new FontLoader(); // https://gero3.github.io/facetype.js/
    this._textureLoader = new TextureLoader();
    this._cubeTextureLoader = new CubeTextureLoader();

    this._createLoadingPromise(OBJECT_ASSETS_OBJ, this._objLoader);
    this._createLoadingPromise(OBJECT_ASSETS_JSON, this._jsonLoader);
    this._createLoadingPromise(OBJECT_ASSETS_BIN, this._byteLoader);
    this._createLoadingPromise(MTL_ASSETS, this._mtlLoader);
    this._createLoadingPromise(TEXTURE_ASSETS, this._textureLoader);
    this._createLoadingPromise(FONT_ASSETS, this._fontLoader);
    this._createLoadingPromise(CUBE_TEXTURE_ASSETS, this._cubeTextureLoader);
  }

  async loadAll(onProgressUpdate) {
    if (typeof onProgressUpdate === 'function') this._onProgressUpdate = onProgressUpdate;
    // Init the loading value props
    const nbrOfAssetsToLoad = this._loadingPromiseArr.length;
    const persentSolvedPerAssets = 100 / nbrOfAssetsToLoad;

    for (let i = 0; i < nbrOfAssetsToLoad; i++) {
      const { promise, name } = this._loadingPromiseArr[i];

      console.log('---');
      console.log(`Load ${name}`);
      const t0 = performance.now();

      try {
        let loadingProgress = 0;
        await promise((v) => {
          const { loaded, total } = v;
          const progress = persentSolvedPerAssets * (loaded / total);
          this._incrementProgress(progress - loadingProgress);
          loadingProgress = progress;
        });
      } catch (e) {
        console.error(e);
      }

      // this._incrementLoader(persentSolvedPerAssets - loadingProgress);
      //

      console.log(`DURATION: ${performance.now() - t0} ms.`);
      console.log('---');

      // Force update progress
      this._setProgress(persentSolvedPerAssets * (i + 1));
    }
  }

  /**
   ****************
   * PRIVATE
   ****************
   */

  // PROCESS
  _incrementProgress(value) {
    this.progress += value;
    this._onProgressUpdate(this.progress);
  }

  _setProgress(value) {
    this.progress = value;
    this._onProgressUpdate(this.progress);
  }

  // LOADERS
  _load({ url, name, loader } = {}, progress = f => f) {
    // TODO rebuild progress
    return new Promise((resolve) => {
      loader.load(url, (...data) => {
        this.assets[name] = data;
        resolve();
      }, progress, () => {
        // TODO purpose fake data
        console.log(`ERROR.loadAll(): ${name} couldn't loaded.`);
        this.assets[name] = false;
        resolve();
      });
    });
  }

  // PROMISES
  _createLoadingPromise(assetList, loader) {
    let i;
    const l = assetList.length;
    for (i = 0; i < l; i++) {
      const { url, name } = assetList[i];
      this._loadingPromiseArr.push({
        promise: progress => this._load({ url, name, loader }, progress),
        name: assetList[i].name,
      });
    }
  }
}

export default new Assets();
