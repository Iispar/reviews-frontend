/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const NewReviewForm = ({
  onSubmit, onClick, className, id, view,
}) => (
  <div id="newReviewForm" style={view ? { display: 'flex' } : { display: 'none' }}>
    <form id={`${id}__form`} onSubmit={(e) => onSubmit(e)} noValidate>
      <span> add a new comment </span>
      <input placeholder="title" />
      <input placeholder="comment body" />
      <input type="date" id="dateInput" />
      <span> or add a file </span>
      <input type="file" id="fileInput" />
    </form>
    <div id={`${id}__buttons`}>
      <button id={`${id}__buttons__create`} form={`${id}__form`} type="submit"> add </button>
      <button id={`${id}__buttons__close`} type="button" onClick={() => onClick()}> close </button>
    </div>
  </div>
);

export default NewReviewForm;
