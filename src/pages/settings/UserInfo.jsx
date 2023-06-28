import React, { useState, useEffect } from 'react';
import $ from 'jquery';

const userInfo = (props) => {
  const { currUsername } = props;
  const { openForm } = props;
  const { currName } = props;
  const [name, setName] = useState(currName);
  const [username, setUsername] = useState(currUsername);

  useEffect(() => {
    if (name !== currName) $('#userInfo__values__name__container__change').css('display', 'flex');
    else $('#userInfo__values__name__container__change').css('display', 'none');
  }, [name]);

  useEffect(() => {
    if (username !== currUsername) $('#userInfo__values__username__container__change').css('display', 'flex');
    else $('#userInfo__values__username__container__change').css('display', 'none');
  }, [username]);

  return (
    <div className="userInfo">
      <div className="userInfo__header">
        <div className="userInfo__header__icon" />
        <div className="userInfo__header__title">
          <span className="userInfo__header__title__username">
            {currUsername}
          </span>
          <button className="userInfo__header__title__change" type="button"> Change profile picture </button>
        </div>
        <button className="userInfo__header__closeButton" type="submit" onClick={() => openForm('none')}> close </button>
      </div>
      <div className="userInfo__values">
        <div className="userInfo__values__name">
          <div className="userInfo__values__name__text">
            name &nbsp;
          </div>
          <div className="userInfo__values__name__container">
            <input className="userInfo__values__name__container__input" id="userInfo__values__name__container__input" defaultValue={currName} onChange={(current) => setName(current.target.value)} />
            <button className="userInfo__values__name__container__change" id="userInfo__values__name__container__change" type="button"> change </button>
          </div>
        </div>
        <div className="userInfo__values__username">
          <span className="userInfo__values__username__text">
            username &nbsp;
          </span>
          <div className="userInfo__values__username__container">
            <input className="userInfo__values__username__container__input" defaultValue={currUsername} onChange={(current) => setUsername(current.target.value)} />
            <button className="userInfo__values__username__container__change" id="userInfo__values__username__container__change" type="button"> change </button>
          </div>
        </div>
        <div className="userInfo__values__password">
          <div className="userInfo__values__password__text">
            password &nbsp;
          </div>
          <div className="userInfo__values__password__container">
            <input className="userInfo__values__password__container__input" placeholder="******" type="password" />
            <button className="userInfo__values__password__container__change" type="button"> change </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default userInfo;
