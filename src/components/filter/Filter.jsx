import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Filter = ({ filter, onChangeFilter }) => {
  const [localFilter, setLocalFilter] = useState(filter);

  const handleFilterChange = e => {
    const newFilterValue = e.target.value;
    setLocalFilter(newFilterValue);
    onChangeFilter(newFilterValue);
  };

  return (
    <input
      type="text"
      value={localFilter}
      onChange={handleFilterChange}
      placeholder="Search contacts"
    />
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
