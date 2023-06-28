import React from 'react';
import propTypes from 'prop-types';
import InputField from '../../components/InputField';
import LargeInputField from '../../components/LargeInputField';
import JsonFileInput from '../../components/JsonFileInput';

/**
 * Renders the file input component.
 * @returns file input compoenent
 */
const FileInput = (props) => {
  const { onSubmit } = props;

  return (
    <div className="fileInput">
      <div className="fileInput__title" id="fileInput__title"> Add new item </div>
      <form className="fileInput__form" id="fileInput__form" onSubmit={(e) => onSubmit(e)}>
        <InputField id="fileName" title="product name" width="280px" height="40px" />
        <LargeInputField id="fileDesc" title="Product description" />
        <JsonFileInput id="jsonFileInput" height="200px" />
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
