import React from 'react';
import propTypes from 'prop-types';
// import { useNewItem } from './allItemsHooks';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Items from './Items';
import FileInput from './FileInput';
import dummyItems from '../../data/dummyData/dummyItems.json';

/**
 * Renders the all items page.
 * @property {String} className - Custom className if wanted. Default ${className}.
 * @property {String} id - Custom id if wanted. Default ${className}.
 * @returns all items page
 */
const AllItems = (props) => {
  const { className } = props;
  const { id } = props;
  /**
   * takes in the submit and calls the new item hook to submit it.
   * Acts accordinfg to the result of the hook.
   * @param {*} e
   *        Submit data.
   */
  const handleCreation = (e) => {
    e.preventDefault();
    // commented for eslint errors as the hook doesn't have fucntionality yet.
    // const values = e.target;
    // would try catch be better here?
    // if (useNewItem(values[0].value, values[1].value, values[2].value)) console.log('success');
    // else console.log('error');
  };

  return (
    <div className={className}>
      <div className={`${className}__grid`}>
        <div className={`${className}__grid__header`} id={`${id}__grid__header`}>
          <Header />
        </div>
        <div className={`${className}__grid__title`} id={`${id}__grid__title`}>
          <span className={`${className}__grid__title__text`}> All your items </span>
        </div>
        <div className={`${className}__grid__items`} id={`${id}__grid__items`}>
          <Items items={dummyItems.items} />
        </div>
        <div className={`${className}__grid__fileInput`} id={`${id}__grid__fileInput`}>
          <FileInput onSubmit={handleCreation} />
        </div>
        <div className={`${className}__grid__footer`} id={`${id}__grid__footer`}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

AllItems.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
};

AllItems.defaultProps = {
  className: 'allItems',
  id: 'allItems',
};

export default AllItems;
