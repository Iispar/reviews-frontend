import React from 'react';
import propTypes from 'prop-types';

// eslint-disable-next-line arrow-body-style
const SearchField = (props) => {
  const { placeholder } = props;
  const { id } = props;
  return (
    <div className="searchField">
      <input className={`${id}__input`} id={`${id}__input`} placeholder={placeholder} />
    </div>
  );
};

SearchField.propTypes = {
  placeholder: propTypes.string,
  id: propTypes.string,
};

SearchField.defaultProps = {
  placeholder: null,
  id: 'searchField',
};

export default SearchField;
