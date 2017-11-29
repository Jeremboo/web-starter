/**
*
* app/views/Layout.js
* Layout
* TODO:
*    - Loader
*    - Show GL
*    - Add children
*
**/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import props from 'core/props';
import helper from 'core/helper';
import loop from 'core/loop';

import engine from 'webgl/engine';

import Loader from 'components/loader';

export default class Layout extends Component {
  constructor(_props) {
    super(_props);

    this.webgl = false;

    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    // Init the webgl (freeze)
    await engine.initWebgl()
    loop.start()
    await this.updateAnim('loader', true)
    await engine.loadAssets() // TODO pass callback to update the loader value
    await this.updateAnim('loader', false)
    // FREEZE
    await engine.initObjects()
    // START DOM ANIMATION
    this.setState({ loading: false })
  }

  render() {
    const { loading } = this.state;
    const { children } = this.props;

    return (
      <div id="layout">
        {loading
          ? <Loader />
          : children
        }
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.any.isRequired,
};
