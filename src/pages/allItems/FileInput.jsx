import React from 'react';
import propTypes from 'prop-types';
import InputField from '../../components/InputField';
import LargeInputField from '../../components/LargeInputField';
import JsonFileInput from '../../components/JsonFileInput';

/**
 * Renders the file input component.
 * @propery {func} onSubmit - the onSubmit function to be used when form is submitted.
 * @property {string} className - custom className if wanted. Default is fileInput.
 * @property {string} id - custom id if wanted. Default is fileInput.
 * @returns file input component
 */
const FileInput = (props) => {
  const { onSubmit } = props;
  const { className } = props;
  const { id } = props;

  return (
    <div className={className}>
      <div className={`${className}__title`} id={`${id}__title`}> Add new item </div>
      <form className={`${className}__form`} id={`${id}__form`} onSubmit={(e) => onSubmit(e)}>
        <InputField id="fileName" title="product name" width="280px" height="40px" />
        <LargeInputField id="fileDesc" title="Product description" />
        <JsonFileInput id="jsonFileInput" height="200px" />
        <button className={`${className}__form__submitBtn`} id={`${id}__form__submitBtn`} type="submit"> submit </button>
      </form>
    </div>
  );
};

FileInput.propTypes = {
  onSubmit: propTypes.func,
  className: propTypes.string,
  id: propTypes.string,
};

FileInput.defaultProps = {
  onSubmit: null,
  className: 'fileInput',
  id: 'fileInput',
};

export default FileInput;
