import { useState, React } from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';

/**
 * Creates a singular large review.
 * @param {*} props
 * @returns singular large review
 */
const LargeReview = (props) => {
  const [open, setOpen] = useState(false);
  const { rating } = props;
  const { body } = props;
  const { id } = props;

  /**
   * Opens and closes the view of the comment depending on its current state.
   */
  const expand = () => {
    if (open) {
      $(`#largeReview__info__${id}`).removeClass('visible');
      $(`#largeReview__info__body__expandBtn__${id}`).css('display', 'flex');
      $(`#largeReview__info__closeBtn__${id}`).css('display', 'none');
      setOpen(false);
    } else {
      $(`#largeReview__info__${id}`).addClass('visible');
      $(`#largeReview__info__body__expandBtn__${id}`).css('display', 'none');
      $(`#largeReview__info__closeBtn__${id}`).css('display', 'flex');
      setOpen(true);
    }
  };

  return (
    <div className="largeReview" id="largeReview">
      <div className="largeReview__info" id={`largeReview__info__${id}`}>
        <div className="largeReview__info__body">
          {body}
          <button className="largeReview__info__body__expandBtn" id={`largeReview__info__body__expandBtn__${id}`} type="button" onClick={() => expand()}> </button>
        </div>
        <div className="largeReview__info__rating">
          {rating}
        </div>
        <button className="largeReview__info__closeBtn" id={`largeReview__info__closeBtn__${id}`} type="button" onClick={() => expand()}> </button>
      </div>
    </div>
  );
};

LargeReview.propTypes = {
  body: propTypes.string,
  rating: propTypes.number,
  id: propTypes.string,
};

LargeReview.defaultProps = {
  body: null,
  rating: null,
  id: null,
};

export default LargeReview;
