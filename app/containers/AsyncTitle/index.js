/**
*
* app/containers/Title/index.js
* Container to manage the data flow
*
**/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getTitle } from 'core/middlewares/asyncTitle';
import Title from './components/Title';

export class AsyncTitle extends Component {

  componentDidMount() {
    const { getTitle } = this.props;
    getTitle();
  }

  render() {
    return (
      <Title
        title={this.props.title}
      />
    );
  }
}
AsyncTitle.propTypes = {
  title: PropTypes.string.isRequired,
  getTitle: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    title: state.title,
  }),
  dispatch => ({
    getTitle: () => { dispatch(getTitle()); },
  })
)(AsyncTitle);
