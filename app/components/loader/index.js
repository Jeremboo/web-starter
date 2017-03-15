/**
*
* /components/Loader/index.js
* Loader :
*
**/

import React, { PropTypes } from 'react';
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
