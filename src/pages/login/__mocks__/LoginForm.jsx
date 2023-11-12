/* eslint-disable react/prop-types */
import React from 'react';

const LoginForm = ({
  errorMessage, onSubmit, view, setView,
}) => (
  <div style={view ? { display: 'flex' } : { display: 'none' }}>
    Login
    <div className="error" id="error">
      {errorMessage}
    </div>
    <form onSubmit={(e) => onSubmit(e)} id="login">
      <input placeholder="loginUsername" />
      <input placeholder="loginPassword" />
      <button type="submit"> login </button>
      <button type="submit" onClick={() => setView('login')}> create new </button>
    </form>
  </div>
);

export default LoginForm;
