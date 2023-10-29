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
  <div className={className} id={id}>
    <div className={`${className}__title`} id={`${id}__title`}> Add new item </div>
    <form className={`${className}__form`} id={`${id}__form`} onSubmit={(e) => onSubmit(e)}>
      <InputField id="fileName" title="product name" width="280px" height="40px" />
      <div className={`${className}__form__categoryAndSubmit`}>
        <label className={`${className}__form__categoryAndSubmit__categoryLabel`} htmlFor="createCategory">
          <span className={`${className}__form__categoryAndSubmit__categoryLabel__text`}>
            category:
          </span>
          <select className={`${className}__form__categoryAndSubmit__categoryLabel__selection`} id="createCategory" name="createCategory">
            <option value="1"> Sports </option>
            <option value="2"> Video games </option>
            <option value="3"> tools </option>
            <option value="4"> pets </option>
            <option value="5"> kitchen </option>
            <option value="6"> apparel </option>
            <option value="7"> electronics </option>
            <option value="8"> furniture </option>
            <option value="9"> home </option>
            <option value="10"> office </option>
            <option value="11"> outdoors </option>
            <option value="12"> toys </option>
          </select>
        </label>
        <button className={`${className}__form__categoryAndSubmit__submitBtn`} id={`${id}__form__submitBtn`} type="submit"> submit </button>
      </div>
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
  className: 'itemInput',
  id: 'itemInput',
};

export default ItemInput;
