import React from 'react';
import propTypes from 'prop-types';
import SettingsInputField from '../../components/SettingsInputField';

/**
 * Renders the delete account form
 * @property {String} className - Custom className if wanted. Default deleteAccount.
 * @property {String} id - Custom id if wanted. Default deleteAccount.
 * @property {func} onSubmit - the onSubmit function for the delete account submit.
 * @property {func} openForm - the function to use when open form is clicked.
 * @returns delete account form.
 */
const DeleteAccount = (props) => {
  const { onSubmit } = props;
  const { openForm } = props;
  const { className } = props;
  const { id } = props;

  return (
    <div className={className} id={id}>
      <div className={`${className}__header`} id={`${className}__header`}>
        <div className={`${className}__header__text`}> delete account </div>
        <button className={`${className}__header__closeButton`} id={`${className}__header__closeButton`} type="submit" onClick={() => openForm('none')}> </button>
      </div>
      <div className={`${className}__form`} id={`${className}__form`}>
        <SettingsInputField type="password" onSubmit={onSubmit} id="deletePassword" warningText="cannot be undone please confirm with your password" button="delete" submitText="I understand. Delete account" />
      </div>
    </div>
  );
};

DeleteAccount.propTypes = {
  onSubmit: propTypes.func,
  openForm: propTypes.func,
  className: propTypes.string,
  id: propTypes.string,
};

DeleteAccount.defaultProps = {
  onSubmit: null,
  openForm: null,
  className: 'deleteAccount',
  id: 'deleteAccount',
};

export default DeleteAccount;
