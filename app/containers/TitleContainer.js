/**
*
* app/containers/TitileContainer.js
* COntainer to manage the data flow
*
**/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setText } from 'core/actionCreator';

import Title from 'components/Title/Title';

export class TitleContainer extends Component {

  componentDidMount() {
    // simulate ajax request
    setTimeout(() => this.props.onTextReceived('Hello World'), 500);
  }

  render() {
    return (
      <Title
        text={this.props.text}
      />
    );
  }
}
TitleContainer.propTypes = {
  text: PropTypes.string.isRequired,
  onTextReceived: PropTypes.func.isRequired,
};


const mapStateToTitleContainerProps = state => ({
  text: state.text,
});

const mapDispatchToTitleContainerProps = dispatch => ({
  onTextReceived: text => dispatch(setText(text)),
});

export default connect(
  mapStateToTitleContainerProps,
  mapDispatchToTitleContainerProps
)(TitleContainer);
