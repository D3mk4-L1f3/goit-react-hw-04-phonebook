import React from 'react';
import PropTypes from 'prop-types';

export default function Filter({ onFilter, filter }) {
  const handleInputChange = evt => {
    onFilter(evt.currentTarget.value);
  };

  return (
    <div>
      <h3>Find contacts by part of name or number</h3>
      <input
        onChange={handleInputChange}
        type="text"
        value={filter}
        placeholder="... searching ..."
      />
    </div>
  );
}

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
