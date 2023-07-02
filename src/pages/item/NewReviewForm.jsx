import React from 'react';
import propTypes from 'prop-types';
import LargeInputField from '../../components/LargeInputField';
import JsonFileInput from '../../components/JsonFileInput';

/**
 * renders the the new review component for for single item.
 * @property {func} onSubmit - the submit function to be used when the form is submitted.
 * @property {func} onClick - the function to be used when the close button is clicked.
 * @property {String} className - Custom className if wanted. Default newReviewForm.
 * @property {String} id - Custom id if wanted. Default newReviewForm.
 * @returns new review form component.
 */
const NewReviewForm = (props) => {
  const { onSubmit } = props;
  const { onClick } = props;
  const { className } = props;
  const { id } = props;

  return (
    <div className={className} id={id}>
      <form className={`${className}__form`} id={`${className}__form`} onSubmit={(e) => onSubmit(e)} noValidate>
        <span className={`${className}__form__title`}> add a new comment </span>
        <LargeInputField title="comment body" height="300px" />
        <span className={`${className}__form__file`}> or add a file </span>
        <JsonFileInput id={`${className}__form__fileInput`} height="200px" />
      </form>
      <div className={`${className}__buttons`} id={`${className}__buttons`}>
        <button className={`${className}__buttons__create`} id={`${className}__buttons__create`} form={`${className}__form`} type="submit"> add </button>
        <button className={`${className}__buttons__close`} id={`${className}__buttons__close`} type="button" onClick={() => onClick()}> close </button>
      </div>
    </div>
  );
};

NewReviewForm.propTypes = {
  onSubmit: propTypes.func,
  onClick: propTypes.func,
  className: propTypes.string,
  id: propTypes.string,
};

NewReviewForm.defaultProps = {
  onSubmit: null,
  onClick: null,
  className: 'newReviewForm',
  id: 'newReviewForm',
};

export default NewReviewForm;
