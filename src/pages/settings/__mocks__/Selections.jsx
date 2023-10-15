/* eslint-disable react/prop-types */
import React from 'react';

const Selections = ({
  className,
  id,
  setPassword,
  setUsername,
  setName,
  deleteAccount,
  setEmail,
  updateAccount,
  username,
  name,
  email,
}) => (
  <div>
    <div id={`${id}__buttons`}>
      edit profile
      delete account
    </div>
    <div className={`${className}__form`} id={`${id}__form`}>
      <input placeholder="name" defaultValue={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="username" defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
      <form id={`${className}__values__password`} onSubmit={(e) => updateAccount(e)}>
        <input placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <input placeholder="confirmPassword" />
        <button type="submit"> change </button>
      </form>
      <button type="button" onClick={deleteAccount}>delete</button>
    </div>
  </div>
);

export default Selections;
