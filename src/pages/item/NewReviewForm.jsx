import React from 'react';
import propTypes from 'prop-types';
import LargeInputField from '../../components/LargeInputField';
import JsonFileInput from '../../components/JsonFileInput';

/**
 * renders the the new review for for single item.
 * @returns
 */
// eslint-disable-next-line arrow-body-style
const NewReviewForm = (props) => {
  const { onSubmit } = props;

  return (
    <div className="newReviewForm" id="newReviewForm">
      <form className="newReviewForm__form" id="newReviewForm__form">
        <span className="newReviewForm__form__title"> add a new comment </span>
        <LargeInputField title="comment body" height="300px" />
        <span className="newReviewForm__form__file"> or add a file </span>
        <JsonFileInput id="newReviewForm__form__fileInput" height="200px" />
      </form>
      <button className="newReviewForm__button" type="button" onSubmit={() => onSubmit()}> new review </button>
    </div>
  );
};

NewReviewForm.propTypes = {
  onSubmit: propTypes.func,
};

NewReviewForm.defaultProps = {
  onSubmit: null,
};

export default NewReviewForm;
