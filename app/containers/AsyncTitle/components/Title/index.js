/**
*
* app/components/Title/Title.js
* Title
*
**/

import React, { PropTypes } from 'react';
import './index.styl';

const Title = ({ title }) => <h1>{title}</h1>;
Title.propTypes = {
  title: PropTypes.string,
};
Title.defaultProps = {
  title: '...',
};

export default Title;
