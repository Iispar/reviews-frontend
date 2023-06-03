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
  const { type } = props;
  const { error } = props;
  const cutoutWidth = getFontSize(title);
  const errorWidth = getFontSize(error);

  return (
    <div className={name} id={id}>
      <div className={`${name}__container`} style={{ width }}>
        <input className={`${name}__container__input`} id={`${id}__container__input`} required placeholder={title} autoComplete="off" type={type} />
        <div className={`${name}__container__cutout`} htmlFor={`${id}__container__input`} style={{ width: cutoutWidth }} />
        <div className={`${name}__container__error`} id={`${id}__container__error`} htmlFor={`${id}__container__input`} style={{ width: errorWidth }}>
          {error}
        </div>
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
  type: propTypes.string,
  error: propTypes.string,
};

InputField.defaultProps = {
  title: null,
  id: 'searchField',
  name: 'searchField',
  width: '220px',
  type: 'text',
  error: 'wrong input',
};

export default InputField;
