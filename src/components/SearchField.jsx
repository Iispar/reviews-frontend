import React from 'react';
import propTypes from 'prop-types';

/**
 * renders a search field for the application.
 * @param {string} placeholder
 * @param {string} className
 * @param {string} id
 * @returns a search field
 */
const SearchField = (props) => {
  const { placeholder } = props;
  const { id } = props;
  const { className } = props;
  return (
    <div className={className}>
      <input className={`${className}__input`} id={`${id}__input`} placeholder={placeholder} type="search" />
    </div>
  );
};

SearchField.propTypes = {
  placeholder: propTypes.string,
  id: propTypes.string,
  className: propTypes.string,
};

SearchField.defaultProps = {
  placeholder: null,
  id: 'searchField',
  className: 'searchField',
};

export default SearchField;
