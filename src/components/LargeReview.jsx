import React from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';

/**
 * Creates a singular large review.
 * @param {*} props
 * @returns singular large review
 */
const LargeReview = (props) => {
  const { rating } = props;
  const { body } = props;
  const { id } = props;
  const { title } = props;
  const { date } = props;

  /**
   * Opens and closes the view of the comment depending on its current state.
   * We need to use props close because if we use for example useState it gets
   * confused with the different states of the comments. Ie open one and close
   * it by opening a other one. Then we have a comment with the state open
   * even tough it is closed, because we can't change the state from the other
   * component. This is wy we just use open which we tell if the action is
   * the open action or not. And open will open the selected one as with every
   * press we have to close all the other ones that might be open...
   */
  const toggle = (open) => {
    // scroll to top when we close the div so it doesn't show midlle of the ext.
    $('.largeReview__info__body').animate({ scrollTop: $(window).scrollTop(0) });
    // close all
    $('.largeReview').css('flex-grow', 0);
    $('.largeReview').css('padding-bottom', '12px');
    $('.largeReview__info__rating__expandBtn').css('display', 'flex');
    $('.largeReview__info__closeBtn').css('display', 'none');
    $('.largeReview__info__body__header').css('display', 'none');
    $('.largeReview__info__body').removeClass('showAll');
    // open btn is pressed. First open correct one.
    if (open) {
      $('.largeReview').css('padding-bottom', '4px');
      $(`#largeReview__info__rating__expandBtn__${id}`).css('display', 'none');
      $(`#largeReview__info__closeBtn__${id}`).css('display', 'flex');
      $(`#largeReview__info__body__header__${id}`).css('display', 'flex');
      $(`#largeReview__info__body__${id}`).addClass('showAll');
      $(`#largeReview__${id}`).css('flex-grow', '2');
    }
  };

  return (
    <div className="largeReview" id={`largeReview__${id}`}>
      <div className="largeReview__info" id={`largeReview__info__${id}`}>
        <div className="largeReview__info__body" id={`largeReview__info__body__${id}`}>
          <div className="largeReview__info__body__header" id={`largeReview__info__body__header__${id}`}>
            <span className="largeReview__info__body__header__title">{title}</span>
            <span className="largeReview__info__body__header__date">{date}</span>
          </div>
          <span className="largeReview__info__body__comment">{body}</span>
        </div>
        <div className="largeReview__info__rating">
          <span className="largeReview__info__rating__value">{rating}</span>
          <span className="largeReview__info__rating__icon" />
          <button className="largeReview__info__rating__expandBtn" id={`largeReview__info__rating__expandBtn__${id}`} type="button" onClick={() => toggle(true)}> </button>
        </div>
        <button className="largeReview__info__closeBtn" id={`largeReview__info__closeBtn__${id}`} type="button" onClick={() => toggle()}> </button>
      </div>
    </div>
  );
};

LargeReview.propTypes = {
  body: propTypes.string,
  rating: propTypes.number,
  id: propTypes.string,
  title: propTypes.string,
  date: propTypes.string,
};

LargeReview.defaultProps = {
  body: null,
  rating: null,
  id: null,
  title: null,
  date: null,
};

export default LargeReview;
