import React from 'react';
import Header from './Header';
import Footer from './Footer';
import GuardedRoute from '../helpers/GuardedRoute';

/**
 * Sets the header, footer and guarded route to all pages automatically.
 * @returns full view
 */
const LayoutsWithNav = () => (
  <div className="layout" id="layout">
    <div className="layout__header">
      <Header />
    </div>
    <div className="layout__content" id="layout__content">
      <GuardedRoute />
    </div>
    <div className="layout__footer">
      <Footer />
    </div>
  </div>
);

export default LayoutsWithNav;
