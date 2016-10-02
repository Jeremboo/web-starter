/**
*
* app/containers/TitleContainer/components/Title/index.js
* Title
*
**/

import React from 'react';
import './Title.styl';

const Title = ({ text }) => <h1>{text}</h1>;
Title.propTypes = {
  text: React.PropTypes.string,
};
Title.defaultProps = {
  text: '...',
};

export default Title;
