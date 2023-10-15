/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const InputField = ({
  title, id, className, width, height, type, error, regex, onChange,
}) => (
  <div className="searchField" id={id} style={{ width, height }}>
    <div className="searchField__container">
      <input className="searchField__container__input" id={`${id}__container__input`} required placeholder={title} autoComplete="off" type={type} onChange={(e) => { if (onChange) onChange(e.target.value); }} />
      <div className="searchField_:container__cutout" id={`${id}__container__cutout`} htmlFor={`${id}__container__input`} style={{ width: '200px' }} />
      <div className="searchField__container__error" id={`${id}__container__error`} htmlFor={`${id}__container__input`} style={{ width: '200px' }}>
        {error}
      </div>
      <label className="searchField__container__label" id={`${id}__container__label`} htmlFor={`${id}__container__input`} style={{ top: '40px' }}>
        <span className="searchField__title" id={`${id}__title`}>{title}</span>
      </label>
    </div>
  </div>
);

InputField.defaultProps = {
  onChange: null,
};

export default InputField;
