import React, { useState } from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';

/**
 * Renders the header. Includes a hamburger menu and a nav bar.
 * @property {String} className - custom className if wanted. Default is header
 * @property {String} id - custom is if wanted. Default is header
 * @returns header
 */
const Header = ({ className, id }) => {
  const [navState, setNavState] = useState(false);
  const [transform, setTransform] = useState(null);
  const [clicked, setClicked] = useState('');

  /**
   * Toggles the nav bar on and off when the hamburger menu is clicked.
   */
  const toggleNavBar = () => {
    if (navState) {
      setTransform('scaleX(0)');
      setClicked('');
      $('#layout').removeClass('disableScroll');

      setNavState(false);
    } else {
      setTransform('scaleX(1)');
      setClicked('__clicked');
      $('#layout').addClass('disableScroll');

      setNavState(true);
    }
  };

  /**
   * Logs the user out.
   */
  const logOut = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('accountId');
    window.location.reload();
  };

  return (
    <div className={className} id={id}>
      <div className={`${className}__header`} id={`${id}__header`}>
        <div className={`${className}__header__hamburger${clicked}`} id={`${id}__header__hamburger`}>
          <button className={`${className}__header__hamburger__btn`} id={`${id}__header__hamburger__btn`} type="button" onClick={() => toggleNavBar()} aria-label="hamburger" />
        </div>
      </div>
      <nav className={`${className}__navBar`} id={`${id}__navBar`} style={{ transform }}>
        <a className={`${className}__navBar__list__home`} href="/home"> home </a>
        <a className={`${className}__navBar__list__allItems`} href="/all"> all items </a>
        <a className={`${className}__navBar__list__settings`} href="/settings"> settings </a>
        <button className={`${className}__navBar__list__logout`} type="button" onClick={() => logOut()}> log out </button>
      </nav>
    </div>
  );
};

Header.propTypes = {
  id: propTypes.string,
  className: propTypes.string,
};

Header.defaultProps = {
  id: 'headerContainer',
  className: 'headerContainer',
};

export default Header;
