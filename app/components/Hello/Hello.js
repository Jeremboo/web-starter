/**
 * app/components/Hello.js
 *
 * This is a sample CommonJS module.
 * Take a look at http://browserify.org/ for more info
 */

export default class Hello {

  constrcutor() {
    this.message = 'HelloWorld';
  }

  sayHello() {
    console.log(this.message);
  }
}
