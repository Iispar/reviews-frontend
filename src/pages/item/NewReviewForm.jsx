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
  const { onClick } = props;

  return (
    <div className="newReviewForm" id="newReviewForm">
      <form className="newReviewForm__form" id="newReviewForm__form" onSubmit={(e) => onSubmit(e)} noValidate>
        <span className="newReviewForm__form__title"> add a new comment </span>
        <LargeInputField title="comment body" height="300px" />
        <span className="newReviewForm__form__file"> or add a file </span>
        <JsonFileInput id="newReviewForm__form__fileInput" height="200px" />
      </form>
      <div className="newReviewForm__buttons">
        <button className="newReviewForm__buttons__create" id="newReviewForm__buttons__create" form="newReviewForm__form" type="submit"> add </button>
        <button className="newReviewForm__buttons__close" id="newReviewForm__buttons__close" type="button" onClick={() => onClick()}> close </button>
      </div>
    </div>
  );
};

NewReviewForm.propTypes = {
  onSubmit: propTypes.func,
  onClick: propTypes.func,
};

NewReviewForm.defaultProps = {
  onSubmit: null,
  onClick: null,
};

export default NewReviewForm;
