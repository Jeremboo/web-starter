/**
 * app/components/Hello.js
 *
 * This is a sample CommonJS module.
 *
 */

export default class Hello {

  constructor() {
    this.message = 'Hello World';
  }

  sayHello() {
    console.log(this.message);
  }
}
