import React, { PropTypes } from 'react';

const Filter = ({ visibilityFilter, onFilterClick }) => (
  <div>
    <button
      onClick={onFilterClick}
    >Switch</button>
     - {visibilityFilter}
  </div>
);
Filter.propTypes = {
  visibilityFilter: PropTypes.string.isRequired,
  onFilterClick: PropTypes.func.isRequired,
};

export default Filter;
