import React from 'react';
import propTypes from 'prop-types';

/**
 * Renders the delete account form
 * @param {*} props
 * @returns delete account form.
 */
const DeleteAccount = (props) => {
  const { onSubmit } = props;
  const { openForm } = props;
  return (
    <div className="deleteAccount" id="deleteAccount">
      <div className="deleteAccount__header">
        <div className="deleteAccount__header__text"> delete account </div>
        <button className="userInfo__header__closeButton" type="submit" onClick={() => openForm('none')}> close </button>
      </div>
      <div className="deleteAccount__form">
        <form className="deleteAccount__form__inputs" onSubmit={(e) => onSubmit(e)}>
          <div className="deleteAccount__form__inputs__confirmation">
            This action
            <span className="deleteAccount__form__inputs__confirmation__warning"> cannot </span>
            be undone. Please confirm with your password.
          </div>
          <input className="deleteAccount__form__inputs__password" type="password" />
          <button className="deleteAccount__form__inputs__deleteButton" type="submit"> I understand. Delete account.</button>
        </form>
      </div>
    </div>
  );
};

DeleteAccount.propTypes = {
  onSubmit: propTypes.func,
  openForm: propTypes.func,
};

DeleteAccount.defaultProps = {
  onSubmit: null,
  openForm: null,
};

export default DeleteAccount;
