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
const Selections = (props) => {
  const { className } = props;
  const { id } = props;

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

  // ALL updates and deletes have *preventDefault* for dev to not update the page...

  /**
   * Formats the event call and calls the delete account hook.
   * @param {*} e - event called with.
   */
  const deleteAccount = (e) => {
    e.preventDefault();
    // if (UseDeleteAccount(e.target[0].value)) console.log('success');
    // else console.log('failure');
  };

  /**
   * Formats the event call and calls the update name hook.
   * @param {*} e - event called with.
   */
  const updateName = (e) => {
    e.preventDefault();
    // if (UseNewName(e.target[0].value)) console.log('success');
    // else console.log('failure');
  };

  /**
   * Formats the event call and calls the update username hook.
   * @param {*} e - event called with.
   */
  const updateUsername = (e) => {
    e.preventDefault();
    // if (UseNewUsername(e.target[0].value)) console.log('success');
    // else console.log('failure');
  };

  /**
   * Formats the event call and calls the update password hook.
   * @param {*} e - event called with.
   */
  const updatePassword = (e) => {
    e.preventDefault();
    // if (UseNewPassword(e.target[0].value)) console.log('success');
    // else console.log('failure');
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
        <UserInfo currUsername="user" openForm={openForm} updateUsername={updateUsername} updateName={updateName} updatePassword={updatePassword} currName="matti meikäläinen" />
        <DeleteAccount onSubmit={deleteAccount} openForm={openForm} />
      </div>
    </div>
  );
};

Selections.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
};

Selections.defaultProps = {
  className: 'selections',
  id: 'selections',
};

export default Selections;
