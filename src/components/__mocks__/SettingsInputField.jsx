/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const SettingsInputField = ({
  className,
  id,
  onSubmit,
  defaultValue,
  title,
  warningText,
  button,
  submitText,
  type,
  onChange,
  confirmationText,
}) => (
  <div id={id}>
    <div id={`${className}__title`}>
      {title}
          &nbsp;
    </div>
    <form className={`${className}__form`} onSubmit={(e) => onSubmit(e)}>
      {warningText !== null ? (
        <div className={`${className}__form__warning`} id={`${id}__form__warning`}>
          {warningText}
        </div>
      ) : (null)}
      <input id={`${id}__form__input`} defaultValue={defaultValue} onChange={(e) => { if (onChange) onChange(e.target.value); }} type={type} />
      <button id={`${id}__form__${button}`} type="submit">
        {submitText}
      </button>
    </form>
  </div>
);

export default SettingsInputField;
