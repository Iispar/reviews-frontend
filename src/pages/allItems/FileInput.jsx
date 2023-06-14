import React from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';
import InputField from '../../components/InputField';
import LargeInputField from '../../components/LargeInputField';

/**
 * Renders the file input component.
 * @returns file input compoenent
 */
// eslint-disable-next-line arrow-body-style
const FileInput = (props) => {
  const { onSubmit } = props;

  $(document).ready(() => {
    $('#fileInput__form__file').on('change', () => {
      const fileName = $('#fileInput__form__file').prop('files')[0].name;
      const regex = /\.[0-9a-z]+$/i;
      const format = fileName.match(regex)[0];
      if (format === '.json') {
        $('#fileInput__form__fileLabel').css('border-color', '#EF8354');
        $('#fileInput__form__fileLabel__succesful').css('display', 'flex');
        $('#fileInput__form__fileLabel__text').css('display', 'none');
        $('#fileInput__form__fileLabel__error').css('display', 'none');
      } else {
        $('#fileInput__form__fileLabel').css('border-color', 'red');
        $('#fileInput__form__fileLabel__error').css('display', 'flex');
        $('#fileInput__form__fileLabel__succesful').css('display', 'none');
        $('#fileInput__form__fileLabel__text').css('display', 'none');
      }
    });
  });

  return (
    <div className="fileInput">
      <div className="fileInput__title" id="fileInput__title"> Add new item </div>
      <form className="fileInput__form" id="fileInput__form" onSubmit={(e) => onSubmit(e)}>
        <InputField id="fileName" title="product name" width="280px" height="40px" />
        <LargeInputField id="fileDesc" title="Product description" />
        <label htmlFor="fileInput__form__file" className="fileInput__form__fileLabel" id="fileInput__form__fileLabel">
          <span className="fileInput__form__fileLabel__text" id="fileInput__form__fileLabel__text"> file </span>
          <div className="fileInput__form__fileLabel__succesful" id="fileInput__form__fileLabel__succesful" />
          <div className="fileInput__form__fileLabel__error" id="fileInput__form__fileLabel__error">
            <div className="fileInput__form__fileLabel__error__logo" />
            <span className="fileInput__form__fileLabel__error__text"> not a json file </span>
          </div>
          <input className="fileInput__form__file" id="fileInput__form__file" type="file" required />
        </label>
        <button className="fileInput__form__submitBtn" id="fileInput__form__submitBtn" type="submit"> submit </button>
      </form>
    </div>
  );
};

FileInput.propTypes = {
  onSubmit: propTypes.func,
};

FileInput.defaultProps = {
  onSubmit: null,
};

export default FileInput;
