import React from 'react';
import propTypes from 'prop-types';

/**
 * Styling and functionality for the search fields in the application.
 * @param {} props
 * @returns
 */

const SearchField = (props) => {
  const { title } = props;
  const { id } = props;
  const { name } = props;
  const { width } = props;

  return (
    <div className={name} id={id}>
      <div className={`${name}__container`} style={{ width }}>
        <input className={`${name}__container__input`} id={`${id}__container__input`} type="text" placeholder={title} autoComplete="off" />
        <label className={`${name}__container__label`} id={`${id}__container__label`} htmlFor={`${id}__container__input`}>
          {title}
        </label>
      </div>
    </div>
  );
};

SearchField.propTypes = {
  title: propTypes.string,
  id: propTypes.string,
  name: propTypes.string,
  width: propTypes.string,
};

SearchField.defaultProps = {
  title: null,
  id: 'searchField',
  name: 'searchField',
  width: '220px',
};

export default SearchField;
