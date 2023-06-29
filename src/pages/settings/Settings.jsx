import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Selections from './Selections';

/**
 * Renders the settings page.
 * @returns settings
 */
// eslint-disable-next-line arrow-body-style
const Settings = () => {
  return (
    <div className="settings">
      <div className="settings__grid">
        <div className="settings__grid__header">
          <Header />
        </div>
        <div className="settings__grid__title">
          Settings
        </div>
        <div className="settings__grid__selections">
          <Selections />
        </div>
        <div className="settings__grid__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Settings;
