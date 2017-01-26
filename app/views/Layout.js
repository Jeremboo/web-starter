/**
*
* app/views/Layout.js
* Layout
*
**/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DevTools from 'mobx-react-devtools';

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      development: (process.env.NODE_ENV === 'development'),
    };

    if (this.state.development) {
      // Enable react dev-tools (https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
      window.React = React;
      document.addEventListener('keydown', (e) => {
        if (e.keyCode === 192) {
          this.setState({ development: !this.state.development });
        }
      });
    }
  }

  render() {
    return (
      <div id="layout">
        { this.props.children }
        {this.state.development ? <DevTools /> : ''}
      </div>
    );
  }
}
Layout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Layout;
