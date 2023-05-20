import React from 'react';
import propTypes from 'prop-types';
import { getFontSize } from './helpers';

/**
 * Styling and functionality for the search fields in the application.
 * @param {} props
 * @returns
 */
const InputField = (props) => {
  const { title } = props;
  const { id } = props;
  const { name } = props;
  const { width } = props;
  const cutoutWidth = getFontSize(title);

  return (
    <div className={name} id={id}>
      <div className={`${name}__container`} style={{ width }}>
        <input className={`${name}__container__input`} id={`${id}__container__input`} required type="text" placeholder={title} autoComplete="off" />
        <div className={`${name}__container__cutout`} htmlFor={`${id}__container__input`} style={{ width: cutoutWidth }} />
        <label className={`${name}__container__label`} id={`${id}__container__label`} htmlFor={`${id}__container__input`}>
          {title}
        </label>
      </div>
    </div>
  );
};

InputField.propTypes = {
  title: propTypes.string,
  id: propTypes.string,
  name: propTypes.string,
  width: propTypes.string,
};

InputField.defaultProps = {
  title: null,
  id: 'searchField',
  name: 'searchField',
  width: '220px',
};

export default InputField;
