/**
*
* /components/Loader/index.js
* Loader :
*
**/

import React from 'react';
import PropTypes from 'prop-types';

import './style.styl';

const Loader = (props) => {
  const {} = props;
  return (
    <section className="Loader">
      Loading...
    </section>
  );
};
Loader.propTypes = {};
Loader.defaultProps = {};

export default Loader;
