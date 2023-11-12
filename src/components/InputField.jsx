import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { useTextWidth } from '../helpers/componentHelpers';

/**
 * Styling and functionality for the input fields in the application.
 * @property {String} title - Title of the input field.
 * @property {String} id - Id of the input field if wanted. Default searchField.
 * @property {String} className - ClassName if wanted. Default searchField.
 * @property {String} width - Width for the input field. Default 220px.
 * @property {String} height - Heigth of the input field. Default 40px.
 * @property {String} type - Type of the input field. Default text.
 * @property {String} error - The error message for the input field.
 * @property {regex} regex - The regex that the input if being compared to for error message.
 * @returns custom input field.
 */
const InputField = ({
  title, id, className, width, height, type, error, regex, onChange, displayError,
}) => {
  const [value, setValue] = useState(null);
  const [errorState, setErrorState] = useState(false);

  // hook to calculate the width of the text
  const cutoutWidth = useTextWidth(title, '16px mulish');
  const errorWidth = useTextWidth(error, '14px mulish');
  const labelHeight = `${height.replace('px', '') / 4}px`;

  /**
   * Sets change value to local useState and parent component useState.
   * @param {String} val
   *        Changed value.
   */
  const setValues = (val) => {
    setValue(val);
    if (onChange) onChange(val);
  };

  /**
   * UseEffect hook to check the input that it matches to the regex
   * sets additional error message on display if it exists
   */
  useEffect(() => {
    if (value === null || regex == null) return;
    if (regex.test(value)) {
      setErrorState(false);
    } else {
      setErrorState(true);
    }
  }, [value]);

  return (
    <div className={className} id={id} style={{ width, height }}>
      <div className={`${className}__container`}>
        <input className={`${className}__container__input`} id={`${id}__container__input`} required placeholder={title} autoComplete="off" type={type} onChange={(e) => setValues(e.target.value)} style={errorState || displayError ? { 'border-color': '#FF0000' } : { 'border-color': '#EF8354' }} />
        <div className={`${className}__container__cutout`} id={`${id}__container__cutout`} htmlFor={`${id}__container__input`} style={{ width: cutoutWidth }} />
        <div className={`${className}__container__error`} id={`${id}__container__error`} htmlFor={`${id}__container__input`} style={errorState || displayError ? { width: errorWidth, display: 'flex' } : { width: errorWidth, display: 'none' }}>
          {error}
        </div>
        <label className={`${className}__container__label`} id={`${id}__container__label`} htmlFor={`${id}__container__input`} style={errorState || displayError ? { top: labelHeight, display: 'none' } : { top: labelHeight, display: 'flex' }}>
          <span id={`${id}__title`}>{title}</span>
        </label>
      </div>
    </div>
  );
};

InputField.propTypes = {
  title: propTypes.string,
  id: propTypes.string,
  className: propTypes.string,
  width: propTypes.string,
  type: propTypes.string,
  error: propTypes.string,
  height: propTypes.string,
  regex: propTypes.instanceOf(RegExp),
  onChange: propTypes.func,
  displayError: propTypes.bool,
};

InputField.defaultProps = {
  title: null,
  id: 'searchField',
  className: 'searchField',
  width: '220px',
  type: 'text',
  error: null,
  height: '40px',
  regex: null,
  onChange: null,
  displayError: false,
};

export default InputField;
