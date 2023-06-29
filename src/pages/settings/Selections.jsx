import React from 'react';
import $ from 'jquery';
import UserInfo from './UserInfo';
import DeleteAccount from './DeleteAccount';

/**
 * renders the selections for the settings page.
 * @returns selctions
 */
const Selections = () => {
  const openForm = (id, btn) => {
    // clumsy...
    // reset borders
    $('#selections__buttons__newUser').css('border-left', 'none ');
    $('#selections__buttons__newPass').css('border-left', 'none');
    $('#selections__buttons__delAccount').css('border-left', 'none');
    // set border
    $(`#${btn}`).css('border-left', '2px solid black');
    // reset screens
    $('#selections__form').css('display', 'none');
    $('#userInfo').css('display', 'none');
    $('#deleteAccount').css('display', 'none');
    // set the screen of the click
    if (id !== 'none') {
      $('#selections__form').css('display', 'flex');
      $(`#${id}`).css('display', 'flex');
    }
  };

  // ALL updates and deletes have *preventDefault* for dev to not update the page...

  /**
   * Delete account :TODO:
   * @param {*} e
   */
  const deleteAccount = (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
  };

  /**
   * Updates name :TODO:
   * @param {*} e
   */
  const updateName = (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
  };

  /**
   * Updates username :TODO:
   * @param {*} e
   */
  const updateUsername = (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
  };

  /**
   * Updates password :TODO:
   * @param {*} e
   */
  const updatePassword = (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
  };

  return (
    <div className="selections">
      <div className="selections__buttons" id="selections__buttons">
        <button className="selections__buttons__newUser" id="selections__buttons__newUser" type="button" onClick={() => openForm('userInfo', 'selections__buttons__newUser')}>
          edit profile
        </button>
        <button className="selections__buttons__delAccount" id="selections__buttons__delAccount" type="button" onClick={() => openForm('deleteAccount', 'selections__buttons__delAccount')}>
          delete account
        </button>
      </div>
      <div className="selections__form" id="selections__form">
        <UserInfo currUsername="user" openForm={openForm} updateUsername={updateUsername} updateName={updateName} updatePassword={updatePassword} currName="matti meikäläinen" />
        <DeleteAccount onSubmit={deleteAccount} openForm={openForm} />
      </div>
    </div>
  );
};

export default Selections;
