import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';
import { useTextWidth } from './helpers';

/**
 * Styling and functionality for the input fields in the application.
 * @property {String} title - Title of the input field.
 * @property {String} id - Id of the input field if wanted. Default searchField.
 * @property {String} name - Classname if wanted. Default searchField.
 * @property {String} width - Width for the input field. Default 220px.
 * @property {String} height - Heigth of the input field. Default 40px.
 * @property {String} type - Type of the input field. Default text.
 * @property {String} error - The error message for the input field.
 * @property {regex} regex - The regex that the input if being compared to for error message.
 * @returns custom input field.
 */
const InputField = (props) => {
  const { title } = props;
  const { id } = props;
  const { name } = props;
  const { width } = props;
  const { height } = props;
  const { type } = props;
  const { error } = props;
  const { regex } = props;
  const [value, setValue] = useState(null);
  // hook to calculate the width of the text
  const cutoutWidth = useTextWidth(title, '16px hind');
  const errorWidth = useTextWidth(error, '15px hind');
  const labelHeight = `${height.replace('px', '') / 4}px`;

  /**
   * Displays the error message.
   * @param {boolean} on
   *        is the error message should be displayed or not.
   */
  const errorMessage = (on) => {
    if (on) {
      $(`#${id}__container__error`).css('display', 'flex');
      $(`#${id}__container__label`).css('display', 'none');
      $(`#${id}__container__cutout`).css('display', 'none');
      $(`#${id}__container__input`).css('border', '1.5px solid $red');
    } else {
      $(`#${id}__container__error`).css('display', 'none');
      $(`#${id}__container__label`).css('display', 'flex');
      $(`#${id}__container__cutout`).css('display', 'flex');
      $(`#${id}__container__input`).css('border', '1.5px solid $orange');
    }
  };

  /**
   * UseEffect hook to check the input that it matches to the regex
   * sets additional error message on display if it exists
   */
  useEffect(() => {
    if (value === null || regex == null) return;
    if (regex.test(value)) {
      errorMessage(false);
    } else {
      errorMessage(true);
    }
  }, [value]);

  return (
    <div className={name} id={id} style={{ width, height }}>
      <div className={`${name}__container`}>
        <input className={`${name}__container__input`} id={`${id}__container__input`} required placeholder={title} autoComplete="off" type={type} onChange={(e) => setValue(e.target.value)} />
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
  regex: propTypes.instanceOf(RegExp),
};

InputField.defaultProps = {
  title: null,
  id: 'searchField',
  name: 'searchField',
  width: '220px',
  type: 'text',
  error: 'wrong input',
  height: '40px',
  regex: null,
};

export default InputField;
