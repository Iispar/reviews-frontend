import React from 'react';
import propTypes from 'prop-types';
import { useTextWidth } from '../helpers/componentHelpers';

/**
 * Styling and functionality for the large search fields in the application.
 * @property {string} title - Title for the input field.
 * @property {string} id - Custom id if needed. Default largeField.
 * @property {string} className - Custom className id needed. Default largeField.
 * @property {string} width - Width for the input field. Default 280px.
 * @property {string} height - Height for the input field. Default 80px.
 * @property {string} error - Error message for the input field.
 * @returns
 */
const LargeInputField = ({
  title, id, className, width, height, error,
}) => {
  // hook to calculate the width of the text
  const cutoutWidth = useTextWidth(title, '16px hind');
  const errorWidth = useTextWidth(error, '15px hind');

  return (
    <div className={className} id={id}>
      <div className={`${className}__container`} id={`${id}__container`} style={{ width, height }}>
        <textarea className={`${className}__container__input`} id={`${id}__container__input`} required placeholder={title} style={{ height, width }} />
        <div className={`${className}__container__cutout`} id={`${id}__container__cutout`} htmlFor={`${id}__container__input`} style={{ width: cutoutWidth }} />
        <div className={`${className}__container__error`} id={`${id}__container__error`} htmlFor={`${id}__container__input`} style={{ width: errorWidth }}>
          {error}
        </div>
        <label className={`${className}__container__label`} id={`${id}__container__label`} htmlFor={`${id}__container__input`}>
          <span id={`${id}__title`}>{title}</span>
        </label>
      </div>
    </div>
  );
};

LargeInputField.propTypes = {
  title: propTypes.string,
  id: propTypes.string,
  className: propTypes.string,
  width: propTypes.string,
  error: propTypes.string,
  height: propTypes.string,
};

LargeInputField.defaultProps = {
  title: null,
  id: 'largeField',
  className: 'largeField',
  width: '280px',
  error: 'wrong input',
  height: '80px',
};

export default LargeInputField;
