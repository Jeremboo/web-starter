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
  constructor(props) {
    super(props);

    this.webgl = false;

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    loop.start();

    engine.init()
      .then(() => {
        // HELPER
        // TODO make code combinaison
        if (process.env.NODE_ENV === 'development') {
          helper.enable();
          // Directly visible
          if (props.debug.helper) {
            helper.toggle();
          }
        }

        // HIDE LOADER
        this.setState({ loading: false });
      })
    ;
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
