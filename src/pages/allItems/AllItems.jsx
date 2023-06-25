import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Items from './Items';
import FileInput from './FileInput';
import dummyItems from '../../data/dummyData/dummyItems.json';

/**
 * Renders the all items page.
 * @returns all items page
 */
// eslint-disable-next-line arrow-body-style
const AllItems = () => {
  const handleCreation = (e) => {
    e.preventDefault();
    // const values = e.target;
    // console.log(`created with ${values[0].value}, ${values[1].value}, ${values[2].value}`);
  };

  return (
    <div className="allItems">
      <div className="allItems__grid">
        <div className="allItems__grid__header" id="allItems__grid__header">
          <Header />
        </div>
        <div className="allItems__grid__title" id="allItems__grid__title">
          <span className="allItems__grid__title__text"> All your items </span>
        </div>
        <div className="allItems__grid__items" id="allItems__grid__items">
          <Items items={dummyItems.items} />
        </div>
        <div className="allItems__grid__fileInput" id="allItems__grid__fileInput">
          <FileInput onSubmit={handleCreation} />
        </div>
        <div className="allItems__grid__footer" id="allItems__grid__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AllItems;
