import React from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';

/**
 * renders a singular large review.
 * @property {String} rating - The rating value of review.
 * @property {String} body - The body of the review
 * @property {String} id - Custom id if wanted. Default default
 * @property {String} title - Title of the review.
 * @property {String} date - Date of the review.
 * @property {String} classname - Custom className if wanted. Default largeReview.
 * @returns singular large review
 */
const LargeReview = (props) => {
  const { rating } = props;
  const { body } = props;
  const { id } = props;
  const { title } = props;
  const { date } = props;
  const { className } = props;
  const { item } = props;

  /**
   * Opens and closes the view of the comment depending on its current state.
   * I need to use props close because if I use for example useState it gets
   * confused with the different states of the comments. Ie open one and close
   * it by opening a other one. Then I have a comment with the state open
   * even tough it is closed, because I can't change the state from the other
   * component. This is wy I just use open which I tell if the action is
   * the open action or not. And open will open the selected one as with every
   * press I have to close all the other ones that might be open...
   * @param {boolean} open if the view is open or not.
   */
  const toggle = (open) => {
    // scroll to top when I close the div so it doesn't show middle of the ext.
    $(`.${className}__info__body`).animate({ scrollTop: $(window).scrollTop(0) });
    // close all
    $(`.${className}`).css('flex-grow', 0);
    $(`.${className}`).css('padding-bottom', '12px');
    $(`.${className}__info__stats__rating__expandBtn`).css('display', 'flex');
    $(`.${className}__info__closeBtn`).css('display', 'none');
    $(`.${className}__info__body__header`).css('display', 'none');
    $(`.${className}__info__body`).removeClass('showAll');
    $(`.${className}__info__stats__item`).css('display', 'none');
    // open btn is pressed. First open correct one.
    if (open) {
      $(`.${className}`).css('padding-bottom', '4px');
      $(`#${className}__info__body__${id}`).addClass('showAll');
      $(`#${className}__info__stats__rating__expandBtn__${id}`).css('display', 'none');
      $(`#${className}__info__closeBtn__${id}`).css('display', 'flex');
      $(`#${className}__info__body__header__${id}`).css('display', 'flex');
      $(`#${className}__${id}`).css('flex-grow', '2');
      $(`#${className}__info__stats__item__${id}`).css('display', 'flex');
    }
  };

  return (
    <div className={`${className}`} id={`${className}__${id}`}>
      <div className={`${className}__info`} id={`${className}__info__${id}`}>
        <button className={`${className}__info__closeBtn`} id={`${className}__info__closeBtn__${id}`} type="button" onClick={() => toggle()} aria-label="closeButton" />
        <div className={`${className}__info__body`} id={`${className}__info__body__${id}`}>
          <div className={`${className}__info__body__header`} id={`${className}__info__body__header__${id}`}>
            <span className={`${className}__info__body__header__title`} id={`${className}__info__body__header__title`}>{title}</span>
            <span className={`${className}__info__body__header__date`} id={`${className}__info__body__header__date`}>{date}</span>
          </div>
          <span className={`${className}__info__body__comment`} id={`${className}__info__body__comment`}>{body}</span>
        </div>
        <div className={`${className}__info__stats`}>
          <div className={`${className}__info__stats__rating`}>
            <button className={`${className}__info__stats__rating__expandBtn`} id={`${className}__info__stats__rating__expandBtn__${id}`} type="button" onClick={() => toggle(true)} aria-label="expandButton" />
            <span className={`${className}__info__stats__rating__value`} id={`${className}__info__stats__rating__value`}>{rating}</span>
            <div className={`${className}__info__stats__rating__icon`} />
          </div>
          <div className={`${className}__info__stats__item`} id={`${className}__info__stats__item__${id}`}>
            item:
            {item}
          </div>
        </div>
      </div>
    </div>
  );
};

LargeReview.propTypes = {
  body: propTypes.string,
  rating: propTypes.number,
  id: propTypes.number,
  title: propTypes.string,
  date: propTypes.string,
  className: propTypes.string,
  item: propTypes.number,
};

LargeReview.defaultProps = {
  body: null,
  rating: null,
  id: 'default',
  title: null,
  date: null,
  className: 'largeReview',
  item: null,
};

export default LargeReview;
