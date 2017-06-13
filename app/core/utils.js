/**
*
* app/core/utils.js
* Util generic functions.
*
**/

/*
**********
* MATH
**********
*/
// http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
export const getRandomInt = (min, max) => Math.floor((Math.random() * ((max - min) + 1))) + min;
export const getRandomFloat = (min, max) => ((Math.random() * (max - min)) + min);
