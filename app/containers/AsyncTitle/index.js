/**
*
* app/containers/Title/index.js
* Container to manage the data flow
*
**/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getTitle } from './modules/middlewares';
import Title from './components/Title';

export class AsyncTitle extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getTitle());
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
  dispatch: PropTypes.func.isRequired,
};


const mapStateToAsyncTitleProps = state => ({
  title: state.title,
});

export default connect(
  mapStateToAsyncTitleProps
)(AsyncTitle);
