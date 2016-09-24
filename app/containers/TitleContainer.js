/**
*
* app/containers/TitileContainer.js
* COntainer to manage the data flow
*
**/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getTitle } from 'core/middleware/title';

import Title from 'components/Title/Title';

export class TitleContainer extends Component {

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
TitleContainer.propTypes = {
  title: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};


const mapStateToTitleContainerProps = state => ({
  title: state.title,
});

export default connect(
  mapStateToTitleContainerProps
)(TitleContainer);
