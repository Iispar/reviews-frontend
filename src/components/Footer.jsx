import React from 'react';

/**
 * Renders the footer for the application.
 * @returns the footer
 */
const Footer = () => (
  <div className="footer">
    <div className="footer__about" id="footer__about">
      <div className="footer__about__title"> about this website </div>
      <div className="footer__about__body">
        this application is my personal project. It mocks a online shops site for sellers.
        There is a lot more information about the site and how it works on github,
        please refer it if you would like to know more.
      </div>
    </div>
    <div className="footer__contact" id="footer__contact">
      <div className="footer__contact__title"> contact </div>
      <div className="footer__contact__contacts">
        <span className="footer__contact__contacts__email"> iiro.s.partanen@gmail.com </span>
        <span className="footer__contact__contacts__github"> iispar@github.com </span>
      </div>
    </div>
  </div>
);

export default Footer;
