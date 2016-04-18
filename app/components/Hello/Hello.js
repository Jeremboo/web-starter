/**
 * app/components/Hello.js
 *
 * This is a sample CommonJS module.
 *
 */

export default class Hello {
  constructor() {
    this.message = 'HelloWorld';
  }

  sayHello() {
    console.log(this.message);
  }
}
