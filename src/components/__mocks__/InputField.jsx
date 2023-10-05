/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const InputField = ({
  title, id, className, width, height, type, error, regex, onChange,
}) => (
  <div id={id} style={{ width, height }}>
    <div>
      <input id={`${id}__container__input`} required placeholder={title} autoComplete="off" type={type} />
      <div id={`${id}__container__cutout`} htmlFor={`${id}__container__input`} style={{ width: '200px' }} />
      <div id={`${id}__container__error`} htmlFor={`${id}__container__input`} style={{ width: '200px' }}>
        {error}
      </div>
      <label id={`${id}__container__label`} htmlFor={`${id}__container__input`} style={{ top: '40px' }}>
        <span id={`${id}__title`}>{title}</span>
      </label>
    </div>
  </div>
);

export default InputField;
