import React from 'react';
import propTypes from 'prop-types';

/**
 * Renders the footer for the application.
 * @property {String} className - custom className if wanted. Default is footer
 * @property {String} id - custom is if wanted. Default is footer
 * @returns the footer
 */
const Footer = ({ className, id }) => (
  <div className={className} id={id}>
    <div className={`${className}__about`} id={`${id}__about`}>
      <div className={`${className}__about__title`}> about this website </div>
      <div className={`${className}__about__body`}>
        this application is my personal project. It mocks a online shops site for sellers.
        There is a lot more information about the site and how it works on github,
        please refer it if you would like to know more.
      </div>
    </div>
    <div className={`${className}__contact`} id={`${id}__contact`}>
      <div className={`${className}__contact__title`}> contact </div>
      <div className={`${className}__contact__contacts`}>
        <span className={`${className}__contact__contacts__email`}> iiro.s.partanen@gmail.com </span>
        <span className={`${className}__contact__contacts__github`}> iispar@github.com </span>
      </div>
    </div>
  </div>
);

Footer.propTypes = {
  id: propTypes.string,
  className: propTypes.string,
};

Footer.defaultProps = {
  id: 'footer',
  className: 'footer',
};

export default Footer;
