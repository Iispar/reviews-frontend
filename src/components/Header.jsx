import { useState, React } from 'react';
import $ from 'jquery';

/**
 * Renders the header. Includes a hamburger menu and a nav bar.
 * @returns header
 */
const Header = () => {
  const [navState, setNavState] = useState(false);

  /**
   * Toggles the nav bar on and off when the hamburger menu is clicked.
   */
  const toggleNavBar = () => {
    if (navState) {
      $('#navBar').css('transform', 'scaleX(0)');
      $('#header__hamburger').removeClass('clicked');
      $('#layout').removeClass('disableScroll');

      setNavState(false);
    } else {
      $('#navBar').css('transform', 'scaleX(1)');
      $('#header__hamburger').addClass('clicked');
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
    <div>
      <div className="header">
        <div className="header__hamburger" id="header__hamburger">
          <button className="header__hamburger__btn" id="header__hamburger__btn" type="button" onClick={() => toggleNavBar()} aria-label="hamburger" />
        </div>
      </div>
      <nav className="navBar" id="navBar">
        <a className="navBar__list__home" href="/home"> home </a>
        <a className="navBar__list__allItems" href="/all"> all items </a>
        <a className="navBar__list__settings" href="/settings"> settings </a>
        <button className="navBar__list__logout" type="button" onClick={() => logOut()}> log out </button>
      </nav>
    </div>
  );
};

export default Header;
