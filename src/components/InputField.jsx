import React from 'react';
import propTypes from 'prop-types';
import { useTextWidth } from './helpers';

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
  const { height } = props;
  const { type } = props;
  const { error } = props;
  // hook to calculate the width of the text
  const cutoutWidth = useTextWidth(title, '16px hind');
  const errorWidth = useTextWidth(error, '15px hind');
  const labelHeight = `${height.replace('px', '') / 4}px`;
  return (
    <div className={name} id={id} style={{ width, height }}>
      <div className={`${name}__container`}>
        <input className={`${name}__container__input`} id={`${id}__container__input`} required placeholder={title} autoComplete="off" type={type} />
        <div className={`${name}__container__cutout`} id={`${id}__container__cutout`} htmlFor={`${id}__container__input`} style={{ width: cutoutWidth }} />
        <div className={`${name}__container__error`} id={`${id}__container__error`} htmlFor={`${id}__container__input`} style={{ width: errorWidth }}>
          {error}
        </div>
        <label className={`${name}__container__label`} id={`${id}__container__label`} htmlFor={`${id}__container__input`} style={{ top: labelHeight }}>
          <span id={`${id}__title`}>{title}</span>
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
  height: propTypes.string,
};

InputField.defaultProps = {
  title: null,
  id: 'searchField',
  name: 'searchField',
  width: '220px',
  type: 'text',
  error: 'wrong input',
  height: '40px',
};

export default InputField;
