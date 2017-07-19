/**
*
* app/containers/TitileContainer.js
* COntainer to manage the data flow
*
**/

import React, { Component } from 'react';

import Title from 'components/Title';

export default class TitleContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '...',
    };
  }

  componentDidMount() {
    // simulate ajax request
    setTimeout(() => this.setState({ text: 'Hello world' }), 200);
  }

  componentWillUnmount() {}

  render() {
    return (
      <Title
        text={this.state.text}
      />
    );
  }
}
