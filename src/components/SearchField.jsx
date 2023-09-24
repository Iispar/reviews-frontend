import React, { useState, useEffect } from 'react';
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
}) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search !== '') $(`#${id}__close`).css('display', 'flex');
    else $(`#${id}__close`).css('display', 'none');
  }, [search]);

  return (
    <div className={className} id={id}>
      <input className={`${className}__input`} id={`${id}__input`} placeholder={placeholder} type="search" onChange={(e) => { setSearch(e.target.value); onChange(e.target.value); }} />
      <button className={`${className}__close`} id={`${id}__close`} type="button" onClick={() => { setSearch(''); onClear(id); }}> </button>
    </div>
  );
};

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
