import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';

/**
 * renders a input field for a json file.
 * @property {string} id - Custom id if wanted. Default jsonInputField.
 * @property {string} height - Custom height if wanted. Default 200px.
 * @property {string} name - Custom name if wanted. Default jsonInputField.
 * @returns input for json
 */
const JsonInputField = ({ id, height, className }) => {
  const [file, setFile] = useState(null);

  /**
   * When a file is inputted I set it to the file useState which triggers the useEffect
   * to check that the file is the correct format and display corresponding styling.
   */
  useEffect(() => {
    if (file == null) return;
    // get format with regex
    const regex = /\.[0-9a-z]+$/i;
    console.log(file);
    const format = file.match(regex)[0];

    if (format === '.json') {
      $(`#${id}__label`).css('border-color', '#16ca4c');
      $(`#${id}__label__succesful`).css('display', 'flex');
      $(`#${id}__label__text`).css('display', 'none');
      $(`#${id}__label__error`).css('display', 'none');
    } else {
      $(`#${id}__label`).css('border-color', '#EF8354');
      $(`#${id}__label`).css('border-color', 'red');
      $(`#${id}__label__error`).css('display', 'flex');
      $(`#${id}__label__succesful`).css('display', 'none');
      $(`#${id}__label__text`).css('display', 'none');
    }
  }, [file]);

  return (
    <div className={className} id={id}>
      <label htmlFor={`${id}__form`} className={`${className}__label`} id={`${id}__label`} style={{ height }}>
        <span className={`${className}__label__text`} id={`${id}__label__text`}> file </span>
        <div className={`${className}__label__succesful`} id={`${id}__label__succesful`} />
        <div className={`${className}__label__error`} id={`${id}__label__error`}>
          <div className={`${className}__label__error__logo`} />
          <span className={`${className}__label__error__text`} id={`${id}__label__error__text`}> needs to be a JSON file! </span>
        </div>
        <input className={`${className}__label`} id={`${id}__form`} type="file" required onChange={(e) => setFile(e.target.value)} />
      </label>
    </div>
  );
};

JsonInputField.propTypes = {
  id: propTypes.string,
  className: propTypes.string,
  height: propTypes.string,
};

JsonInputField.defaultProps = {
  id: 'jsonFileInput',
  className: 'jsonFileInput',
  height: '200px',
};

export default JsonInputField;
