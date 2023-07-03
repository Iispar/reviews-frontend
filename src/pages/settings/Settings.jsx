import React from 'react';
import propTypes from 'prop-types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Selections from './Selections';

/**
 * Renders the settings page.
 * @property {String} className - Custom className if wanted. Default settings.
 * @property {String} id - Custom id if wanted. Default settings.
 * @returns settings
 */
const Settings = (props) => {
  const { className } = props;
  const { id } = props;

  return (
    <div className={className}>
      <div className={`${className}__grid`}>
        <div className={`${className}__grid__header`} id={`${id}__grid__header`}>
          <Header />
        </div>
        <div className={`${className}__grid__title`} id={`${id}__grid__title`}>
          Settings
        </div>
        <div className={`${className}__grid__selections`} id={`${id}__grid__selections`}>
          <Selections />
        </div>
        <div className={`${className}__grid__footer`} id={`${id}__grid__footer`}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

Settings.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
};

Settings.defaultProps = {
  className: 'settings',
  id: 'settings',
};

export default Settings;
