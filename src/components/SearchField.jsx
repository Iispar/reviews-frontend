import React from 'react';
import propTypes from 'prop-types';

// eslint-disable-next-line arrow-body-style
const SearchField = (props) => {
  const { placeholder } = props;
  return (
    <div className="searchField">
      <input className="searchField__input" placeholder={placeholder} />
    </div>
  );
};

SearchField.propTypes = {
  placeholder: propTypes.string,
};

SearchField.defaultProps = {
  placeholder: null,
};

export default SearchField;
