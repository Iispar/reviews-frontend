/* eslint-disable react/prop-types */
import React from 'react';

const CreateAccountForm = ({ error, onSubmit }) => (
  <div>
    <div className="error">
      {error}
    </div>
    <form onSubmit={(e) => onSubmit(e)} id="create">
      <input placeholder="create username" />
      <input placeholder="create name" />
      <input placeholder="create email" />
      <input placeholder="create password" />
      <input placeholder="create confirmPassword" />
      <select id="select">
        <option value="1"> Seller </option>
      </select>
      <button type="submit"> create </button>
    </form>
  </div>
);

export default CreateAccountForm;
