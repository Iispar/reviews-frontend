import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';

/**
 * An input field for the settings page that is a form with a change button.
 * @property {String} className - Custom className if wanted. Default settingsInput.
 * @property {String} id - Custom id if wanted. Default settingsInput.
 * @property {func} onSubmit - the onSubmit function to be used when submitted.
 * @property {String} defaultValue - the default / current value for the input field.
 * @property {String} title - title for the input field.
 * @property {String} warningText - if wanted a warning text for the input field.
 * @property {String} button - what type of button the change button is. Either change or delete.
 * @property {String} submitText - text used in the submit button.
 * @property {String} type - type of the input field.
 * @returns input field for settings
 */
const SettingsInputField = ({
  className, id, onSubmit, defaultValue, title, warningText, button, submitText, type, onChange,
}) => {
  const [value, setValue] = useState(defaultValue);

  $(document).ready(() => {
    if (warningText !== null) $(`#${id}__form__warning`).css('display', 'flex');
  });

  useEffect(() => {
    if (value !== defaultValue) $(`#${id}__form__${button}`).css('display', 'flex');
    else $(`#${id}__form__${button}`).css('display', 'none');
  }, [value]);

  const changeValue = (val) => {
    setValue(val);
    onChange(val);
  };

  return (
    <div className={className} id={id}>
      <div className={`${className}__title`} id={`${className}__title`}>
        {title}
        &nbsp;
      </div>
      <form className={`${className}__form`} onSubmit={(e) => onSubmit(e)}>
        <div className={`${className}__form__warning`} id={`${id}__form__warning`}>
          {warningText}
        </div>
        <input className={`${className}__form__input`} id={`${id}__form__input`} defaultValue={value} onChange={(e) => changeValue(e.target.value)} type={type} />
        <button className={`${className}__form__${button}`} id={`${id}__form__${button}`} type="submit">
          {submitText}
        </button>
      </form>
    </div>
  );
};

SettingsInputField.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  title: propTypes.string,
  defaultValue: propTypes.string,
  onSubmit: propTypes.func,
  onChange: propTypes.func,
  warningText: propTypes.string,
  button: propTypes.string,
  submitText: propTypes.string,
  type: propTypes.string,
};

SettingsInputField.defaultProps = {
  className: 'settingsInput',
  id: 'settingsInput',
  title: null,
  defaultValue: null,
  onChange: null,
  onSubmit: null,
  warningText: null,
  button: 'change',
  submitText: 'change',
  type: 'text',
};

export default SettingsInputField;
