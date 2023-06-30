import React from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';

/**
 * renders a input field for a json file.
 * @param {string} id
 *        Custom id if wanted. Default jsonInputField.
 * @param {string} height
 *        Custom height if wanted. Default 200px.
 * @param {string} name
 *        Custom name if wanted. Default jsonInputField.
 * @returns input for json
 */
const JsonInputField = (props) => {
  const { id } = props;
  const { height } = props;
  const { className } = props;

  // eventlistener to check the file type when a file is inputted.
  $(document).ready(() => {
    $(`#${id}__form`).on('change', () => {
      const fileName = $(`#${id}__form`).prop('files')[0].name;
      const regex = /\.[0-9a-z]+$/i;
      const format = fileName.match(regex)[0];
      if (format === '.json') {
        $(`#${id}__label`).css('border-color', '#EF8354');
        $(`#${id}__label__succesful`).css('display', 'flex');
        $(`#${id}__label__text`).css('display', 'none');
        $(`#${id}__label__error`).css('display', 'none');
      } else {
        $(`#${id}__label`).css('border-color', 'red');
        $(`#${id}__label__error`).css('display', 'flex');
        $(`#${id}__label__succesful`).css('display', 'none');
        $(`#${id}__label__text`).css('display', 'none');
      }
    });
  });

  return (
    <div className={className} id={id}>
      <label htmlFor={`${id}__form`} className={`${className}__label`} id={`${id}__label`} style={{ height }}>
        <span className={`${className}__label__text`} id={`${id}__label__text`}> file </span>
        <div className={`${className}__label__succesful`} id={`${id}__label__succesful`} />
        <div className={`${className}__label__error`} id={`${id}__label__error`}>
          <div className={`${className}__label__error__logo`} />
          <span className={`${className}__label__error__text`} id={`${id}__label__error__text`}> not a json file </span>
        </div>
        <input className={`${className}__label`} id={`${id}__form`} type="file" required />
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
