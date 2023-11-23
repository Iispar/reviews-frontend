import React from 'react';
import propTypes from 'prop-types';
import SettingsInputField from '../../components/SettingsInputField';

/**
 * Renders the delete account form
 * @property {String} className - Custom className if wanted. Default deleteAccount.
 * @property {String} id - Custom id if wanted. Default deleteAccount.
 * @property {func} onSubmit - the onSubmit function for the delete account submit.
 * @property {func} openForm - the function to use when open form is clicked.
 * @property {Boolean} view - if view is visible or not.
 * @returns delete account form.
 */
const DeleteAccount = ({
  onSubmit, openForm, className, id, view,
}) => (
  <div className={className} id={id} style={view ? { display: 'flex' } : { display: 'none' }}>
    <div className={`${className}__header`} id={`${className}__header`}>
      <div className={`${className}__header__text`}> delete account </div>
      <button className={`${className}__header__closeButton`} id={`${id}__header__closeButton`} type="submit" onClick={() => openForm('none')}> </button>
    </div>
    <div className={`${className}__form`} id={`${className}__form`}>
      <SettingsInputField
        type="text"
        onSubmit={onSubmit}
        id="deletePassword"
        warningText="this action cannot be undone please confirm by writing: this cannot be undone"
        button="delete"
        submitText="I understand. Delete account"
        confirmationText="this cannot be undone"
      />
    </div>
  </div>
);

DeleteAccount.propTypes = {
  onSubmit: propTypes.func,
  openForm: propTypes.func,
  className: propTypes.string,
  id: propTypes.string,
  view: propTypes.bool,
};

DeleteAccount.defaultProps = {
  onSubmit: null,
  openForm: null,
  className: 'deleteAccount',
  id: 'deleteAccount',
  view: true,
};

export default DeleteAccount;
