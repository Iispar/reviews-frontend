/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const Pagination = ({
  next, prev, className, id,
}) => (
  <div id={id}>
    <button id={`${id}__prev`} type="button" onClick={prev}> previous </button>
    <button id={`${id}__next`} type="button" onClick={next}> next </button>
  </div>
);

export default Pagination;
