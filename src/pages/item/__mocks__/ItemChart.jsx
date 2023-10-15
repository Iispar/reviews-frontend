/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import DoubleLineChart from '../../../components/DoubleLineChart';
import SkeletonLoad from '../../../components/SkeletonLoad';
import LoadingBar from '../../../components/LoadingBar';

const ItemChart = ({
  className, id, initData, itemId, token, initLoading,
}) => {
  if (initLoading !== 0) {
    if (initLoading === 1) {
      return (
        <SkeletonLoad />
      );
    }
    return (
      <div id={id}>
        <div>
          {initLoading === 2 ? (<LoadingBar />) : (<div> an error ocurred, please reload </div>)}
          <div id={`${id}__selector`}>
            <button type="button"> month </button>
            <button type="button"> week </button>
            <div id={`${id}__selector__active`} />
          </div>
        </div>
      </div>
    );
  }
  const dataList = [];
  for (let i = 0; i < initData.length; i += 1) {
    dataList.push(
      <div key={i}>
        {initData[i].count}
        <br />
        {initData[i].time}
        <br />
        {initData[i].timeYear}
        <br />
        {initData[i].rating}
      </div>,
    );
  }
  return (
    <div id={id}>
      {initData.length > 2 ? (
        <div>
          {dataList}
          <div id={`${id}__selector`}>
            <button type="button"> month </button>
            <button type="button"> week </button>
            <div id={`${id}__selector__active`} />
          </div>
        </div>
      ) : (
        <div> no data </div>
      )}
    </div>
  );
};

export default ItemChart;
