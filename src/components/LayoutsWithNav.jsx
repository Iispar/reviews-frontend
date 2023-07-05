import { Outlet } from 'react-router-dom';
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const LayoutsWithNav = () => (
  <div className="layout">
    <div className="layout__header">
      <Header />
    </div>
    <div className="layout__content">
      <Outlet />
    </div>
    <div className="layout__footer">
      <Footer />
    </div>
  </div>
);

export default LayoutsWithNav;
