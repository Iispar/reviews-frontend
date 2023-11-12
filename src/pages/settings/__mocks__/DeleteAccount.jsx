/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const DeleteAccount = ({
  onSubmit, openForm, className, id, view,
}) => (
  <div id="deleteAccount" style={view ? { display: 'flex' } : { display: 'none' }}>
    <div id={`${className}__header`}>
      <div> delete account </div>
      <button id={`${className}__header__closeButton`} type="button" onClick={() => openForm('none')}> closeDelete </button>
    </div>
    <div id={`${className}__form`}>
      <form onSubmit={onSubmit}>
        <input placeholder="deleteAccount" />
      </form>
    </div>
  </div>
);

export default DeleteAccount;
