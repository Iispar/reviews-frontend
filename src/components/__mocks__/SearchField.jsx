/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const SearchField = ({
  placeholder, id, className, onChange, onClear,
}) => (
  <div id={id}>
    <input id={`${id}__input`} placeholder={placeholder} type="search" onChange={(e) => onChange(e.target.value)} />
    <button id={`${id}__close`} type="button" onClick={() => onClear(id)}> clear </button>
  </div>
);

export default SearchField;
