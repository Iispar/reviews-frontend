import React, { useState } from 'react';
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
  const [selection, setSelection] = useState('none');

  return (
    <div className={className} id={id}>
      <div className={`${className}__buttons`} id={`${id}__buttons`}>
        <button
          className={`${className}__buttons__newUser`}
          id={`${id}__buttons__newUser`}
          type="button"
          onClick={() => setSelection('profile')}
          style={selection === 'profile' ? { 'border-left': '2px solid black' } : { 'border-left': 'none' }}
        >
          edit profile
        </button>
        <button
          className={`${className}__buttons__delAccount`}
          id={`${id}__buttons__delAccount`}
          type="button"
          onClick={() => setSelection('delete')}
          style={selection === 'delete' ? { 'border-left': '2px solid black' } : { 'border-left': 'none' }}
        >
          delete account
        </button>
      </div>
      <div className={`${className}__form`} id={`${id}__form`} style={selection === 'none' ? { display: 'none' } : { display: 'flex' }}>
        <UserInfo
          currUsername={username}
          currEmail={email}
          openForm={setSelection}
          setUsername={setUsername}
          setName={setName}
          setNewPassword={setPassword}
          setEmail={setEmail}
          updateAccount={(e) => updateAccount(e)}
          currName={name}
          view={selection === 'profile'}
        />
        <DeleteAccount onSubmit={deleteAccount} openForm={setSelection} view={selection === 'delete'} />
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
