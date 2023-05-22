import { useState, React } from 'react';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';

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
          <li className="navBar__home">
            <button className="navBar__home__btn" type="button" onClick={() => navigate('/home')}> home </button>
          </li>
          <li className="navBar__allItems">
            <button className="navBar__allItems__btn" type="button" onClick={() => navigate('/all')}> all items </button>
          </li>
          <li className="navBar__settings">
            <button className="navBar__settings__btn" type="button" onClick={() => navigate('/settings')}> settings </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
