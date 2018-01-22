/**
*
* app/views/Layout.js
* Layout
*
* */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="layout">
        { this.props.children }
      </div>
    );
  }
}
