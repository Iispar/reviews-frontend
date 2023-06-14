import React from 'react';
import propTypes from 'prop-types';
import { useTextWidth } from './helpers';

/**
 * Styling and functionality for the large search fields in the application.
 * @param {} props
 * @returns
 */
const LargeInputField = (props) => {
  const { title } = props;
  const { id } = props;
  const { name } = props;
  const { width } = props;
  const { height } = props;
  const { error } = props;
  // hook to calculate the width of the text
  const cutoutWidth = useTextWidth(title, '16px hind');
  const errorWidth = useTextWidth(error, '15px hind');

  return (
    <div className={name} id={id}>
      <div className={`${name}__container`} style={{ width, height }}>
        <textarea className={`${name}__container__input`} id={`${id}__container__input`} required placeholder={title} style={{ height, width }} />
        <div className={`${name}__container__cutout`} id={`${id}__container__cutout`} htmlFor={`${id}__container__input`} style={{ width: cutoutWidth }} />
        <div className={`${name}__container__error`} id={`${id}__container__error`} htmlFor={`${id}__container__input`} style={{ width: errorWidth }}>
          {error}
        </div>
        <label className={`${name}__container__label`} id={`${id}__container__label`} htmlFor={`${id}__container__input`}>
          <span id={`${id}__title`}>{title}</span>
        </label>
      </div>
    </div>
  );
};

LargeInputField.propTypes = {
  title: propTypes.string,
  id: propTypes.string,
  name: propTypes.string,
  width: propTypes.string,
  error: propTypes.string,
  height: propTypes.string,
};

LargeInputField.defaultProps = {
  title: null,
  id: 'largeField',
  name: 'largeField',
  width: '280px',
  error: 'wrong input',
  height: '80px',
};

export default LargeInputField;
