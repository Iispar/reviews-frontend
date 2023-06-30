import { useState, React } from 'react';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';

/**
 * Renders the header. Includes only a hamburger menu and a nav bar.
 * @returns header
 */
const Header = () => {
  const [navState, setNavState] = useState(false);
  const navigate = useNavigate();

  /**
   * Toggles the nav bar on and off when the hamburger menu is clicked.
   */
  const toggleNavBar = () => {
    if (navState) {
      $('#navBar').css('transform', 'scaleX(0)');
      setNavState(false);
      $('#header__hamburger').removeClass('clicked');
      $('#home__grid').removeClass('disableScroll');
    } else {
      $('#navBar').css('transform', 'scaleX(1)');
      $('#header__hamburger').addClass('clicked');
      $('#home__grid').addClass('disableScroll');
      setNavState(true);
    }
  };
  return (
    <div>
      <div className="header">
        <div className="header__hamburger" id="header__hamburger">
          <button className="header__hamburger__btn" id="header__hamburger__btn" type="button" onClick={() => toggleNavBar()}> </button>
        </div>
      </div>
      <div className="navBar" id="navBar">
        <nav className="navBar__list">
          <button className="navBar__list__home" type="button" onClick={() => navigate('/home')}> home </button>
          <button className="navBar__list__allItems" type="button" onClick={() => navigate('/all')}> all items </button>
          <button className="navBar__list__settings" type="button" onClick={() => navigate('/settings')}> settings </button>
        </nav>
      </div>
    </div>
  );
};

export default Header;
