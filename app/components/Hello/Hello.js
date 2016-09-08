/**
*
* app/components/Hello/Hello.js
* Title
*
**/

import React from 'react';

import './Hello.styl';
//
const Hello = ({ message }) => {
  const sayHello = msg => `Say : ${msg}`;

  return (
    <h1>{sayHello(message)}</h1>
  );
};
Hello.propTypes = {
  message: React.PropTypes.string,
};
Hello.defaultProps = {
  message: '...',
};

export default Hello;
