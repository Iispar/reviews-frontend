import React, { useState, useEffect } from 'react';
import $ from 'jquery';

/**
 * Renders the user info settings page.
 * @param {*} props
 * @returns user info page.
 */
const userInfo = (props) => {
  const { currUsername } = props;
  const { openForm } = props;
  const { currName } = props;
  const { updateName } = props;
  const { updateUsername } = props;
  const { updatePassword } = props;
  const [name, setName] = useState(currName);
  const [username, setUsername] = useState(currUsername);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (name !== currName) $('#userInfo__values__name__input__change').css('display', 'flex');
    else $('#userInfo__values__name__input__change').css('display', 'none');
  }, [name]);

  useEffect(() => {
    if (username !== currUsername) $('#userInfo__values__username__input__change').css('display', 'flex');
    else $('#userInfo__values__username__input__change').css('display', 'none');
  }, [username]);

  useEffect(() => {
    if (password !== '') $('#userInfo__values__password__confirmContainer').css('display', 'grid');
    else $('#userInfo__values__password__confirmContainer').css('display', 'none');
    if (password === confirmPassword) $('#userInfo__values__password__confirmContainer__input__change').css('display', 'flex');
    else $('#userInfo__values__password__confirmContainer__input__change').css('display', 'none');
  }, [password, confirmPassword]);

  return (
    <div className="userInfo" id="userInfo">
      <div className="userInfo__header">
        <div className="userInfo__header__icon" />
        <div className="userInfo__header__title">
          <span className="userInfo__header__title__username" id="userInfo__header__title__username">
            {currUsername}
          </span>
          <button className="userInfo__header__title__change" id="userInfo__header__title__change" type="button"> Change profile picture </button>
        </div>
        <button className="userInfo__header__closeButton" id="userInfo__header__closeButton" type="submit" onClick={() => openForm('none')}>  </button>
      </div>
      <div className="userInfo__values">
        <div className="userInfo__values__name" id="userInfo__values__name">
          <div className="userInfo__values__name__text">
            name &nbsp;
          </div>
          <form className="userInfo__values__name__input" onSubmit={(e) => updateName(e)}>
            <input className="userInfo__values__name__input__field" id="userInfo__values__name__input__input" defaultValue={currName} onChange={(current) => setName(current.target.value)} />
            <button className="userInfo__values__name__input__change" id="userInfo__values__name__input__change" type="submit"> change </button>
          </form>
        </div>
        <div className="userInfo__values__username" id="userInfo__values__username">
          <span className="userInfo__values__username__text">
            username &nbsp;
          </span>
          <form className="userInfo__values__username__input" onSubmit={(e) => updateUsername(e)}>
            <input className="userInfo__values__username__input__field" defaultValue={currUsername} onChange={(current) => setUsername(current.target.value)} />
            <button className="userInfo__values__username__input__change" id="userInfo__values__username__input__change" type="submit"> change </button>
          </form>
        </div>
        <form className="userInfo__values__password" id="userInfo__values__password" onSubmit={(e) => updatePassword(e)}>
          <div className="userInfo__values__password__passContainer">
            <div className="userInfo__values__password__passContainer__passText">
              password &nbsp;
            </div>
            <div className="userInfo__values__password__passContainer__input">
              <input className="userInfo__values__password__passContainer__input__field" placeholder="******" type="password" onChange={(current) => setPassword(current.target.value)} />
            </div>
          </div>
          <div className="userInfo__values__password__confirmContainer" id="userInfo__values__password__confirmContainer">
            <div className="userInfo__values__password__confirmContainer__confirmText">
              confirm &nbsp;
            </div>
            <div className="userInfo__values__password__confirmContainer__input">
              <input className="userInfo__values__password__confirmContainer__input__field" type="password" onChange={(current) => setConfirmPassword(current.target.value)} />
              <button className="userInfo__values__password__confirmContainer__input__change" id="userInfo__values__password__confirmContainer__input__change" type="submit"> change </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default userInfo;
