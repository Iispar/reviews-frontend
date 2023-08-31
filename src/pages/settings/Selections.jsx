import React from 'react';
import $ from 'jquery';
import propTypes from 'prop-types';
import UserInfo from './UserInfo';
import DeleteAccount from './DeleteAccount';

/**
 * renders the selections for the settings page.
 * @property {String} className - Custom className if wanted. Default selections.
 * @property {String} if - Custom className if wanted. Default selections.
 * @returns selctions
 */
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
}) => {
  /**
   * Opens the form to see user info or delete account.
   * @param {String} selection
   *        Selected id to view.
   * @param {String} btn
   *        What button is pressed.
   */
  const openForm = (selection, btn) => {
    // clumsy...
    // reset borders
    $(`#${className}__buttons__newUser`).css('border-left', 'none ');
    $(`#${className}__buttons__newPass`).css('border-left', 'none');
    $(`#${className}__buttons__delAccount`).css('border-left', 'none');
    // set border
    $(`#${btn}`).css('border-left', '2px solid black');
    // reset screens
    $(`#${className}__form`).css('display', 'none');
    $('#userInfo').css('display', 'none');
    $('#deleteAccount').css('display', 'none');
    // set the screen of the click
    if (selection !== 'none') {
      $(`#${className}__form`).css('display', 'flex');
      $(`#${selection}`).css('display', 'flex');
    }
  };

  return (
    <div className={className}>
      <div className={`${className}__buttons`} id={`${id}__buttons`}>
        <button className={`${className}__buttons__newUser`} id={`${id}__buttons__newUser`} type="button" onClick={() => openForm('userInfo', 'selections__buttons__newUser')}>
          edit profile
        </button>
        <button className={`${className}__buttons__delAccount`} id={`${id}__buttons__delAccount`} type="button" onClick={() => openForm('deleteAccount', 'selections__buttons__delAccount')}>
          delete account
        </button>
      </div>
      <div className={`${className}__form`} id={`${id}__form`}>
        <UserInfo
          currUsername={username}
          currEmail={email}
          openForm={openForm}
          setUsername={setUsername}
          setName={setName}
          setNewPassword={setPassword}
          setEmail={setEmail}
          updateAccount={(e) => updateAccount(e)}
          currName={name}
        />
        <DeleteAccount onSubmit={deleteAccount} openForm={openForm} />
      </div>
    </div>
  );
};

Selections.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  setPassword: propTypes.func,
  setName: propTypes.func,
  setUsername: propTypes.func,
  deleteAccount: propTypes.func,
  setEmail: propTypes.func,
  updateAccount: propTypes.func,
  username: propTypes.string,
  name: propTypes.string,
  email: propTypes.string,
};

Selections.defaultProps = {
  className: 'selections',
  id: 'selections',
  setPassword: null,
  setName: null,
  setUsername: null,
  deleteAccount: null,
  setEmail: null,
  updateAccount: null,
  username: null,
  name: null,
  email: null,
};

export default Selections;
