import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ItemList from './ItemList';
import FileInput from './FileInput';

// eslint-disable-next-line arrow-body-style
const AllItems = () => {
  return (
    <div className="allItems">
      <div className="allItems__grid">
        <div className="allItems__grid__header">
          <Header />
        </div>
        <div className="allItems__grid__title">
          <span className="allItems__grid__title__text"> All your items </span>
        </div>
        <div className="allItems__grid__items">
          <ItemList />
        </div>
        <div className="allItems__grid__fileInput">
          <FileInput />
        </div>
        <div className="allItems__grid__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AllItems;
