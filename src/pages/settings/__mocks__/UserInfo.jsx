/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const UserInfo = ({
  currUsername,
  openForm,
  currName,
  currEmail,
  setName,
  setUsername,
  setNewPassword,
  updateAccount,
  className,
  id,
  setEmail,
  view,
}) => (
  <div id="userInfo" style={view ? { display: 'flex' } : { display: 'none' }}>
    <div>
      <form onSubmit={(e) => updateAccount(e)}>
        <button id={`${id}__header__closeButton`} type="button" onClick={() => openForm('none')}> closeUser </button>
        <input placeholder="name" onChange={setName} defaultValue={currName} />
        <input placeholder="username" onChange={setUsername} defaultValue={currUsername} />
        <input placeholder="email" onChange={setEmail} defaultValue={currEmail} />
        <input placeholder="password" onChange={setNewPassword} />
        <button type="submit"> submit </button>
      </form>
    </div>
  </div>
);

export default UserInfo;
