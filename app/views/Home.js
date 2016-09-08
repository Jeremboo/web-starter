/**
*
* app/views/Home.js
* Home
*
**/

import React, { Component } from 'react';

import Hello from 'components/Hello/Hello';

export default class Home extends Component {

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <section className="_content">
        <Hello
          message="Hello world"
        />
      </section>
    );
  }
}
