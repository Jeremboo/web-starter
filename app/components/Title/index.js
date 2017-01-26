/**
*
* app/components/Title/Title.js
* Title
*
**/

import React, { PropTypes } from 'react';
import './style.styl';

const Title = ({ text, loaded }) =>
  <h1 style={{ backgroundColor: loaded ? 'white' : 'red' }}>
    {text}
  </h1>
;
Title.propTypes = {
  text: PropTypes.string,
  loaded: PropTypes.bool,
};
Title.defaultProps = {
  text: '...',
  loaded: true,
};

export default Title;
