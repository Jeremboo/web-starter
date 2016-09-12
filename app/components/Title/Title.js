/**
*
* app/components/Title/Title.js
* Title
*
**/

import React from 'react';
import './Title.styl';

const Title = ({ title }) => <h1>{title}</h1>;
Title.propTypes = {
  title: React.PropTypes.string,
};
Title.defaultProps = {
  title: '...',
};

export default Title;
