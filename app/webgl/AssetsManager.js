import {
  JSONLoader, FontLoader, TextureLoader, CubeTextureLoader,
} from 'three';
import BytesLoader from 'vendors/BytesLoader';

/* List of assets to load */
// WARNING load and parse object makes freeze
// TODO just load the .json and parse after
const OBJECT_ASSETS = [
  { name: 'bottle', url: require('../assets/objects/bottle.json') },
];
const OBJECT_ASSETS_BIN = [
  { name: 'bottleBin', url: require('../assets/objects/bottle.bin') },
];
const FONT_ASSETS = [
  { name: 'gothamBlack', url: require('../assets/objects/fonts/Gotham-Black.json') },
  { name: 'lato', url: require('../assets/objects/fonts/Lato.json') },
];
const TEXTURE_ASSETS = [
    { name: 'label', url: require('../assets/imgs/label.jpg') },
    { name: 'label_animmap', url: require('../assets/imgs/label_animmap.jpg') },
    { name: 'label_heightmap', url: require('../assets/imgs/label_heightmap.jpg') },
    { name: 'label_normalmap', url: require('../assets/imgs/label_normalmap.jpg') },
    { name: 'bubble_mask_1', url: require('../assets/imgs/bubble_mask_1.jpg') },
    { name: 'bubble_mask_2', url: require('../assets/imgs/bubble_mask_2.jpg') },
    { name: 'bubble_mask_3', url: require('../assets/imgs/bubble_mask_3.jpg') },
];
const CUBE_TEXTURE_ASSETS = [
  { name: 'bottleGlass',
    url: [
      require('../assets/imgs/px.png'),
      require('../assets/imgs/nx.png'),
      require('../assets/imgs/py.png'),
      require('../assets/imgs/ny.png'),
      require('../assets/imgs/pz.png'),
      require('../assets/imgs/nz.png'),
    ] },
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

    this._jsonLoader = new JSONLoader();
    this._byteLoader = new BytesLoader();
    this._fontLoader = new FontLoader(); // https://gero3.github.io/facetype.js/
    this._textureLoader = new TextureLoader();
    this._cubeTextureLoader = new CubeTextureLoader();

    this._createLoadingPromise(OBJECT_ASSETS, this._jsonLoader);
    this._createLoadingPromise(OBJECT_ASSETS_BIN, this._byteLoader);
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

      let loadingProgress = 0;
      const result = await promise((v) => {
        const { loaded, total } = v;
        const progress = persentSolvedPerAssets * (loaded / total);
        this._incrementProgress(progress - loadingProgress);
        loadingProgress = progress;
      });
      // this._incrementLoader(persentSolvedPerAssets - loadingProgress);

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
