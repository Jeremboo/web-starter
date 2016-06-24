/**
*
* app/components/Hello/Hello.js
* Title
*
**/

import React, { Component } from 'react';

import './Hello.styl';

export default class Hello extends Component {

  _sayHello() {
    return 'Hello world';
  }
  render() {
    return <h1>{this._sayHello()}</h1>;
  }
}
