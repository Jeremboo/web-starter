/**
*
* app/containers/TitileContainer.js
* COntainer to manage the data flow
*
**/

import React, { Component } from 'react';
import { PropTypes, inject, observer } from 'mobx-react';

import Title from 'components/Title';

class TitleContainer extends Component {

  componentDidMount() {
    this.props.title.updateName();
  }

  componentWillUnmount() {}

  render() {
    const { name, loaded } = this.props.title;
    return (
      <Title text={name} loaded={loaded} />
    );
  }
}
TitleContainer.propTypes = {
  title: PropTypes.observableObject.isRequired,
};

export default inject('title')(observer(TitleContainer));
