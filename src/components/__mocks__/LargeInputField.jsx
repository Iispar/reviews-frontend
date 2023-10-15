/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const LargeInputField = ({
  title, id, className, width, height, error,
}) => (
  <div className={className} id={id}>
    <div className={`${className}__container`} id={`${id}__container`} style={{ width, height }}>
      <textarea className={`${className}__container__input`} id={`${id}__container__input`} required placeholder={title} style={{ height, width }} />
      <div className={`${className}__container__cutout`} id={`${id}__container__cutout`} htmlFor={`${id}__container__input`} style={{ width: '200px' }} />
      <div className={`${className}__container__error`} id={`${id}__container__error`} htmlFor={`${id}__container__input`} style={{ width: '200px' }}>
        {error}
      </div>
      <label className={`${className}__container__label`} id={`${id}__container__label`} htmlFor={`${id}__container__input`}>
        <span id={`${id}__title`}>{title}</span>
      </label>
    </div>
  </div>
);

export default LargeInputField;
