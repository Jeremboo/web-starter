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

import React, { Component, PropTypes } from 'react';

import engine from 'core/engine';

import Loader from 'components/loader';

export default class Layout extends Component {
  constructor(props) {
    super(props);

    this.webgl = false;

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    engine.init()
    .then(() => {
      this.setState({ loading: false });
    });
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
