/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import SkeletonLoad from '../../../components/SkeletonLoad';

const HomeChart = ({
  className, initData, id, token, accountId, initLoading,
}) => {
  // if loading.
  if (initLoading !== 0) {
    // if initial load
    if (initLoading === 1) { return (<SkeletonLoad />); }
    // if waiting for data.
    return (
      <div className={className} id={id}>
        <div>
          <div> loading </div>
          <div className={`${className}__selector`} id={`${id}__selector`}>
            <button className={`${className}__selector__month`} type="button"> month </button>
            <button className={`${className}__selector__week`} type="button"> week </button>
            <div className={`${className}__selector__active`} id={`${id}__selector__active`} />
          </div>
        </div>
      </div>
    );
  }
  const data = [];
  for (let i = 0; i < initData.length; i += 1) {
    data.push(
      <div>
        {initData[i].count}
        <br />
        {initData[i].time}
        <br />
        {initData[i].rating}
      </div>,
    );
  }
  // if data loaded.
  return (
    <div className={className} id={id}>
      {initData.length > 2 ? (
        <div>
          <div>{data}</div>
          <div className={`${className}__selector`} id={`${id}__selector`}>
            <button className={`${className}__selector__month`} type="button"> month </button>
            <button className={`${className}__selector__week`} type="button"> week </button>
            <div className={`${className}__selector__active`} id={`${id}__selector__active`} />
          </div>
        </div>
      ) : (
        <div className={`${className}__empty`}> no data </div>
      )}
    </div>
  );
};

export default HomeChart;
