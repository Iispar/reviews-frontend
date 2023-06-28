import React, { useState } from 'react';
import $ from 'jquery';
import UserInfo from './UserInfo';

const Selections = () => {
  const [open, setOpen] = useState(false);
  const openForm = (id) => {
    $('#selections__buttons__newUser').css('border-left', 'none ');
    $('#selections__buttons__newPass').css('border-left', 'none');
    $('#selections__buttons__delAccount').css('border-left', 'none');
    $(`#${id}`).css('border-left', '2px solid black');
    if (open && id === 'none') {
      $('#selections__form').css('display', 'none');
      setOpen(false);
    } else {
      $('#selections__form').css('display', 'flex');
      setOpen(true);
    }
  };
  return (
    <div className="selections">
      <div className="selections__buttons" id="selections__buttons">
        <button className="selections__buttons__newUser" id="selections__buttons__newUser" type="button" onClick={() => openForm('selections__buttons__newUser')}>
          edit profile
        </button>
        <button className="selections__buttons__delAccount" id="selections__buttons__delAccount" type="button" onClick={() => openForm('selections__buttons__delAccount')}>
          delete account
        </button>
      </div>
      <div className="selections__form" id="selections__form">
        <UserInfo currUsername="user" openForm={openForm} currName="matti meikäläinen" />
      </div>
    </div>
  );
};

export default Selections;
