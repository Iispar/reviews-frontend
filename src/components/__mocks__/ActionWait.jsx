/* eslint-disable react/prop-types */
import React from 'react';

const ActionWait = ({ loading, className, id }) => {
  let message;
  if (loading === 5) {
    message = (
      <div className={`${className}__container`} id={id}>
        success
      </div>
    );
  } else if (loading === 6) {
    message = (
      <div className={`${className}__container`} id={id}>
        fail
      </div>
    );
  }
  return (
    <div className={className} id={id}>
      {loading === 4 ? (
        <div className={`${className}__container`} id={id}>
          loading
        </div>
      ) : (
        message
      )}
    </div>
  );
};

export default ActionWait;
