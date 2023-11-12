import React, { useState } from 'react';
import propTypes from 'prop-types';
import DoubleLineChart from '../../components/DoubleLineChart';
import reviewsService from '../../services/reviewsService';
import SkeletonLoad from '../../components/SkeletonLoad';
import LoadingBar from '../../components/LoadingBar';

/**
 * Renders the chart component for the home page.
 * @property {String} ClassName - Custom className if wanted. Default homeChart.
 * @property {json} initData - The initial data that this component is loaded with.
 * @property {String} id - Custom id if wanted. Default homeChart.
 * @property {string} accountId - Id of account used for chart
 * @property {String} token - Token for account
 * @property {Integer} loading - Status of loading. 0 is loaded, 1 is initial load
 *                               and 2 is retrieving data.
 * @returns chart component
 */
const HomeChart = ({
  className, initData, id, token, accountId, initLoading,
}) => {
  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState(initLoading);
  const [state, setState] = useState('month');

  /**
   * Changes the view and sets the css for the active bar.
   * @param {String} selection - which timespan was selected
   * @param {String} selectionText - text of selection
   */
  const changeView = (selectionText) => {
    setLoading(2);
    reviewsService.getChartForAccount(accountId, selectionText, token)
      .then((res) => {
        setData(res);
        setLoading(0);
      })
      .catch(() => {
        setLoading(4);
      });
    setState(selectionText);
  };

  // if loading.
  if (loading !== 0) {
    // if initial load
    if (loading === 1) {
      return (
        <SkeletonLoad id="skeletonLoad" />
      );
    }
    // if waiting for data.
    return (
      <div className={className} id={id}>
        <div>
          {loading === 2 ? (<LoadingBar />) : (<div> an error ocurred, please reload </div>)}
          <div className={`${className}__selector`} id={`${id}__selector`}>
            <button className={`${className}__selector__month`} type="button" onClick={() => changeView('month')}> month </button>
            <button className={`${className}__selector__week`} type="button" onClick={() => changeView('week')}> week </button>
            <div className={`${className}__selector__active`} id={`${id}__selector__active`} style={state === 'month' ? { left: '63px', width: '38px' } : { left: '106px', width: '32px' }} />
          </div>
        </div>
      </div>
    );
  }
  // if data loaded.
  return (
    <div className={className} id={id}>
      {data.length > 2 ? (
        <div>
          <DoubleLineChart data={data} />
          <div className={`${className}__selector`} id={`${id}__selector`}>
            <button className={`${className}__selector__month`} type="button" onClick={() => changeView('month')}> month </button>
            <button className={`${className}__selector__week`} type="button" onClick={() => changeView('week')}> week </button>
            <div className={`${className}__selector__active`} id={`${id}__selector__active`} style={state === 'month' ? { left: '63px', width: '38px' } : { left: '106px', width: '32px' }} />
          </div>
        </div>
      ) : (
        <div className={`${className}__empty`}> no data </div>
      )}
    </div>
  );
};

HomeChart.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
  initData: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  token: propTypes.string,
  accountId: propTypes.string,
  initLoading: propTypes.number,
};

HomeChart.defaultProps = {
  className: 'homeChart',
  id: 'homeChart',
  initData: [],
  token: null,
  accountId: null,
  initLoading: 0,
};

export default HomeChart;
