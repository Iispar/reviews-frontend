import React from 'react';
import propTypes from 'prop-types';

/**
 * Renders the wait circle and success / error message for the application.
 * @property {Integer} loading - the state of loading. 4 is being loaded,
 *                               5 is load failed and 6 is success.
 * @returns the loadingBar
 */
const ActionWait = ({ loading }) => {
  let message;
  if (loading === 5) {
    message = (
      <div className="actionWait__container">
        <div className="actionWait__container__success">
          <div className="actionWait__container__success__circleBorder" />
          <div className="actionWait__container__success__circle">
            <div className="actionWait__container__success__check" />
          </div>
        </div>
      </div>
    );
  } else if (loading === 6) {
    message = (
      <div className="actionWait__container">
        <div className="actionWait__container__error">
          <div className="actionWait__container__error__circleBorder" />
          <div className="actionWait__container__error__circle">
            <div className="actionWait__container__error__cross" />
          </div>
        </div>
        <span className="actionWait__container__errorText"> please try again </span>
      </div>
    );
  }
  return (
    <div className="actionWait">
      <div className="actionWait__container">
        {loading === 4 ? (
          <div className="actionWait__container__ring">
            <div />
            <div />
            <div />
            <div />
          </div>
        ) : (
          message
        )}
      </div>
    </div>
  );
};

ActionWait.propTypes = {
  loading: propTypes.number,
};

ActionWait.defaultProps = {
  loading: 4,
};

export default ActionWait;
