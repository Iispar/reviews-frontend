import React from 'react';
import $ from 'jquery';
import propTypes from 'prop-types';

/**
 * renders a search field for the application.
 * @property {string} placeholder - the placeholder for field.
 * @property {string} className - custom className if wanted. Default searchFIeld.
 * @property {string} id - custom id if wanted. Default searchField.
 * @property {function} onChange - The function used when the input field is used.
 * @returns a search field
 */
const SearchField = ({
  placeholder, id, className, onChange, onClear,
}) => (
  <div className={className}>
    <input className={`${className}__input`} id={`${id}__input`} placeholder={placeholder} type="search" onChange={(e) => onChange(e.target.value)} />
    {$(`#${id}__input`).val() !== '' ? (
      <button className={`${className}__close`} id={`${id}__close`} type="button" onClick={() => onClear(id)}> </button>
    ) : (<div />)}
  </div>
);

SearchField.propTypes = {
  placeholder: propTypes.string,
  id: propTypes.string,
  className: propTypes.string,
  onChange: propTypes.func,
  onClear: propTypes.func,
};

SearchField.defaultProps = {
  placeholder: null,
  id: 'searchField',
  className: 'searchField',
  onChange: null,
  onClear: null,
};

export default SearchField;
