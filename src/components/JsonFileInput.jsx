import React from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';

/**
 * renders a input field for a json file.
 * @returns input for json
 */
const JsonInputField = (props) => {
  const { id } = props;
  const { height } = props;
  // eslint-disable-next-line no-unused-vars
  const { name } = props;

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
    <div className="jsonFileInput" id={id}>
      <label htmlFor={`${id}__form`} className="jsonFileInput__label" id={`${id}__label`} style={{ height }}>
        <span className="jsonFileInput__label__text" id={`${id}__label__text`}> file </span>
        <div className="jsonFileInput__label__succesful" id={`${id}__label__succesful`} />
        <div className="jsonFileInput__label__error" id={`${id}__label__error`}>
          <div className="jsonFileInput__label__error__logo" />
          <span className="jsonFileInput__label__error__text"> not a json file </span>
        </div>
        <input className="jsonFileInput__form" id={`${id}__form`} type="file" required />
      </label>
    </div>
  );
};

JsonInputField.propTypes = {
  id: propTypes.string,
  name: propTypes.string,
  height: propTypes.string,
};

JsonInputField.defaultProps = {
  id: 'jsonFileInput',
  name: 'jsonFileInput',
  height: '200px',
};

export default JsonInputField;
