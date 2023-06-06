import React from 'react';
import InputField from '../../components/InputField';
import LargeInputField from '../../components/LargeInputField';

// eslint-disable-next-line arrow-body-style
const FileInput = () => {
  return (
    <div className="fileInput">
      <div className="fileInput__title"> Add new item </div>
      <form className="fileInput__form">
        <InputField title="product name" width="280px" height="40px" />
        <LargeInputField title="Product description" />
        <label htmlFor="fileInput__form__file" className="fileInput__form__fileLabel">
          <span className="fileInput__form__fileLabel__text"> file </span>
          <input id="fileInput__form__file" type="file" />
        </label>
        <button className="fileInput__form__submitBtn" type="submit"> submit </button>
      </form>
    </div>
  );
};

export default FileInput;
