import React from 'react';
import propTypes from 'prop-types';

/**
 * Renders the wait circle and success / error message for the application.
 * @property {Integer} loading - the state of loading. 4 is being loaded,
 *                               6 is load failed and 5 is success.
 * @property {String} className - custom className if wanted. Default is actionWait.
 * @property {String} id - custom id if wanted. Default is actionWait.
 * @returns the loadingBar
 */
const ActionWait = ({ loading, className, id }) => {
  let message;
  if (loading === 5) {
    message = (
      <div className={`${className}__container`} id={`${id}__container`}>
        <div className={`${className}__container__success`} id={`${id}__container__success`}>
          <div className={`${className}__container__success__circleBorder`} id={`${id}__container__success__circleBorder`} />
          <div className={`${className}__container__success__circle`} id={`${id}__container__success__circle`}>
            <div className={`${className}__container__success__circle__check`} id={`${id}__container__success__circle__check`} />
          </div>
        </div>
      </div>
    );
  } else if (loading === 6) {
    message = (
      <div className={`${className}__container`} id={`${id}__container`}>
        <div className={`${className}__container__error`} id={`${id}__container__error`}>
          <div className={`${className}__container__error__circleBorder`} id={`${id}__container__error__circleBorder`} />
          <div className={`${className}__container__error__circle`} id={`${id}__container__error__circle`}>
            <div className={`${className}__container__error__circle__cross`} id={`${id}__container__error__circle__cross`} />
          </div>
        </div>
        <span className={`${className}__container__errorText`} id={`${id}__container__errorText`}> please try again </span>
      </div>
    );
  }
  return (
    <div className={className} id={id}>
      {loading === 4 ? (
        <div className={`${className}__container`} id={`${id}__container`}>
          <div className={`${className}__container__ring`} id={`${id}__container__ring`}>
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      ) : (
        message
      )}
    </div>
  );
};

ActionWait.propTypes = {
  loading: propTypes.number,
  className: propTypes.string,
  id: propTypes.string,
};

ActionWait.defaultProps = {
  loading: 4,
  className: 'actionWait',
  id: 'actionWait',
};

export default ActionWait;
