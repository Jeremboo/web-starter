import React, { Component } from 'react';

export default class Layout extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div id="layout">
        { this.props.children }
      </div>
    );
  }
}
Layout.propTypes = { children: React.PropTypes.node };
