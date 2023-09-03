import React from 'react';
import propTypes from 'prop-types';
import InputField from '../../components/InputField';

/**
 * Renders the item input component.
 * @propery {Function} onSubmit - the onSubmit function to be used when form is submitted.
 * @property {string} className - custom className if wanted. Default is fileInput.
 * @property {string} id - custom id if wanted. Default is fileInput.
 * @returns file input component
 */
const ItemInput = ({ onSubmit, className, id }) => (
  <div className={className}>
    <div className={`${className}__title`} id={`${id}__title`}> Add new item </div>
    <form className={`${className}__form`} id={`${id}__form`} onSubmit={(e) => onSubmit(e)}>
      <InputField id="fileName" title="product name" width="280px" height="40px" />
      <label className={`${className}__form__category__label`} htmlFor="createCategory">
        role:
        <select id="createCategory" name="createCategory">
          <option value="1"> Sports </option>
          <option value="2"> TODO </option>
        </select>
      </label>
      <button className={`${className}__form__submitBtn`} id={`${id}__form__submitBtn`} type="submit"> submit </button>
    </form>
  </div>
);

ItemInput.propTypes = {
  onSubmit: propTypes.func,
  className: propTypes.string,
  id: propTypes.string,
};

ItemInput.defaultProps = {
  onSubmit: null,
  className: 'fileInput',
  id: 'fileInput',
};

export default ItemInput;