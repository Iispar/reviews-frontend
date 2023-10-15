/* eslint-disable react/prop-types */
import React from 'react';

const ItemInput = ({ onSubmit }) => (
  <div id="itemInputMock">
    <form onSubmit={onSubmit}>
      <input id="mockNameInput" placeholder="name" />
      <select id="mockSelect" name="createCategory">
        <option value="1"> Selection </option>
      </select>
      <button type="submit"> submit </button>
    </form>
  </div>
);

export default ItemInput;
