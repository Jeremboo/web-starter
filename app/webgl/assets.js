import {
  JSONLoader, FontLoader, TextureLoader,
} from 'three';

import props from 'core/props';

const assets = {
  fonts: {
    // font: require('../assets/objects/fonts/font.json'),
  },
  objects: {
    // obj: require('../assets/objects/obj.json'),
  },
  textures: {
    // img: require('../assets/imgs/img.jpg'),
  },
};
export default assets;

/**
 ****************
 * LOADERS
 ****************
 */
const load = (filename, progress = f => f, loader) => new Promise((resolve, reject) => {
  loader.load(filename, (...data) => {
    resolve(...data);
  }, progress, reject);
});
const jsonLoader = new JSONLoader();
const loadJSON = (fileName, progress = f => f) => load(fileName, progress, jsonLoader);
const fontLoader = new FontLoader(); // https://gero3.github.io/facetype.js/
const loadFont = (fileName, progress = f => f) => load(fileName, progress, fontLoader);
const textureLoader = new TextureLoader();
const loadTexture = (fileName, progress = f => f) => load(fileName, progress, textureLoader);

/**
 ****************
 * LOAD ALL ASSETS
 ****************
 */
export const loadAssets = new Promise((resolve, reject) => {
  // Load all assets before resolving
  const promises = [];
  let onPromiseComplete = f => f;
  // OBJS
  JSON.parse(JSON.stringify(assets.objects), (key, value) => {
    if (key === '') return;
    promises.push(loadJSON(value).then((data) => {
      onPromiseComplete();
      assets.objects[key] = data;
    }));
  });
  // TEXTURES
  JSON.parse(JSON.stringify(assets.textures), (key, value) => {
    if (key === '') return;
    promises.push(loadTexture(value).then((data) => {
      onPromiseComplete();
      assets.textures[key] = data;
    }));
  });
  // FONTS
  JSON.parse(JSON.stringify(assets.fonts), (key, value) => {
    if (key === '') return;
    promises.push(loadFont(value).then((data) => {
      onPromiseComplete();
      assets.fonts[key] = data;
    }));
  });

  // // Init the loading value props
  // const nbrOfAssetsToLoad = promises.length;
  // const persentSolvedPerAssets = 90 / nbrOfAssetsToLoad;
  // onPromiseComplete = () => {
  //   props.loadingValue += persentSolvedPerAssets;
  // };

  Promise.all(promises).then(resolve).catch(reject);
});
