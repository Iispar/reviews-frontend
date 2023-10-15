/* eslint-disable react/prop-types */
import React from 'react';

const LoginForm = ({ errorMessage, onSubmit }) => (
  <div>
    <div className="error" id="error">
      {errorMessage}
    </div>
    <form onSubmit={(e) => onSubmit(e)} id="login">
      <input placeholder="loginUsername" />
      <input placeholder="loginPassword" />
      <button type="submit"> login </button>
    </form>
  </div>
);

export default LoginForm;
