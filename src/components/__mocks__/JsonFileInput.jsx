/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const JsonInputField = ({ id, height, className }) => (
  <div id={id}>
    <input id={`${id}__form`} type="file" required />
  </div>
);

export default JsonInputField;
