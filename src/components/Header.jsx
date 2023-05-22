import { useState, React } from 'react';
import $ from 'jquery';

const Header = () => {
  const [navState, setNavState] = useState(false);
  /**
   * Toggles the nav bar on and off when the hamburger menu is clicked.
   */
  const toggleNavBar = () => {
    if (navState) {
      $('#navBar').css('transform', 'scaleX(0)');
      setNavState(false);
      $('#header__hamburger').removeClass('clicked');
    } else {
      $('#navBar').css('transform', 'scaleX(1)');
      $('#header__hamburger').addClass('clicked');
      setNavState(true);
    }
  };
  return (
    <>
      <div className="header">
        <div className="header__hamburger" id="header__hamburger">
          <button className="header__hamburger__btn" type="button" onClick={() => toggleNavBar()}> </button>
        </div>
      </div>
      <div className="navBar" id="navBar">
        <ul className="navBar__list">
          <li className="navBar__home"> home </li>
          <li className="navBar__allItems"> all items </li>
          <li className="navBar__settings"> settings </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
