/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import $ from 'jquery';
import { useParams } from 'react-router-dom';
import propTypes from 'prop-types';
import Title from './Title';
import NewReview from './NewReview';
import Words from './Words';
import ItemChart from './ItemChart';
import Reviews from './Reviews';
import NewReviewForm from './NewReviewForm';
import pagesService from '../../services/pagesService';
import { UseNewReview, useGetReviews } from './itemHooks';
import reviewsService from '../../services/reviewsService';
import ParseInputFile from '../../helpers/ParseInputFile';
import { useGetLocalStorage } from '../../helpers/helperHooks';

/**
 * Renders the single Item page.
 * @property {String} className - Custom className if wanted. Default item.
 * @property {String} id - Custom id if wanted. Default item.
 * @returns single item page
 */
const Item = ({ className, id }) => {
  const { itemId } = useParams();
  const [title, setTitle] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [rating, setRating] = useState(null);
  const [posWords, setPosWords] = useState(null);
  const [negWords, setNegWords] = useState(null);
  const [posReviews, setPosReviews] = useState(null);
  const [negReviews, setNegReviews] = useState(null);
  const [reviewsCount, setReviewsCount] = useState(null);
  const [token, setToken] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [chart, setChart] = useState(null);
  const [sort, setSort] = useState('none');
  const [search, setSearch] = useState(null);
  const [sortDir, setSortDir] = useState('none');
  const page = useRef(0);

  /**
   * UseEffect to get data at page load.
   */
  useEffect(() => {
    const storage = useGetLocalStorage();

    setToken(storage.token);
    setAccountId(storage.accountId);

    pagesService.getItem(itemId, storage.token)
      .then((res) => {
        setReviews(res.reviews);
        setPosWords(res.topPos.slice(0, 5));
        setNegWords(res.topNeg.slice(0, 5));
        setChart(res.chart);
        setTitle(res.title);
        setRating(res.rating.toString());
        setReviewsCount(res.reviewsCount);
        setPosReviews(res.positiveReviews);
        setNegReviews(res.negativeReviews);
      });
  }, []);

  /**
   * Opens the new review form.
   */
  const newReview = () => {
    $('#words').css('display', 'none');
    $('#newReview').css('display', 'none');
    $('#newReviewForm').css('display', 'flex');
  };

  /**
   * Closes the new review form.
   */
  const closeNew = () => {
    $('#words').css('display', 'flex');
    $('#newReview').css('display', 'flex');
    $('#newReviewForm').css('display', 'none');
  };

  /**
   * Function to create new review.
   * @param {Function} e
   *        Event that is called with.
   */
  const submitReview = async (e) => {
    e.preventDefault();
    let list;
    // if file input is not empty.
    if (e.target[3].files[0]) {
      list = await ParseInputFile(e.target[3].files[0]);
    } else {
      list = [];
      list.push({
        title: e.target[0].value,
        body: e.target[1].value,
        date: e.target[2].value,
      });
    }
    UseNewReview(itemId, accountId, list, token);
  };

  /**
   * Function to load the next page of reviews
   */
  const nextPage = () => {
    const formattedSort = sort !== 'none' ? `review_${sort}` : sort;
    $('#pagination__prev').prop('disabled', false);
    useGetReviews(itemId, search, page.current + 1, formattedSort, sortDir, token, setReviews);
    page.current += 1;
  };

  /**
     * Function to load the previous page of reviews
     */
  const prevPage = () => {
    const formattedSort = sort !== 'none' ? `review_${sort}` : sort;
    useGetReviews(itemId, search, page.current - 1, formattedSort, sortDir, token, setReviews);
    page.current -= 1;
    if (page.current === 0) {
      $('#pagination__prev').prop('disabled', true);
    }
  };

  /**
   * Function to search with search
   * @param {Function} e
   *        event that is called with.
   */
  const onSearch = (e) => {
    page.current = 0;
    const formattedSort = sort !== 'none' ? `review_${sort}` : sort;
    e.preventDefault();
    useGetReviews(itemId, search, page.current, formattedSort, sortDir, token, setReviews);
  };

  /**
   * Function to search with selected sort.
   * @param {String} selSort
   *        Sort that was selected.
   * @param {String} selSortDir
   *        Sort direction that was selected.
   */
  const searchSort = (selSort, selSortDir) => {
    page.current = 0;
    setSort(selSort);
    setSortDir(selSortDir);

    useGetReviews(itemId, search, page.current, `review_${selSort}`, selSortDir, token, setReviews);
  };

  return (
    <div className={className} id={id}>
      <div className={`${className}__grid`}>
        <div className={`${className}__grid__title`} id={`${className}__grid__title`}>
          <Title
            name={title}
            reviewsCount={reviewsCount}
            ratingValue={rating}
            posReviews={posReviews}
            negReviews={negReviews}
            testId="test"
          />
        </div>
        <div className={`${className}__grid__reviews`} id={`${className}__grid__reviews`}>
          <Reviews
            reviews={reviews}
            setSort={(selSort, selSortDir) => searchSort(selSort, selSortDir)}
            setSortDir={setSortDir}
            nextPage={() => nextPage()}
            prevPage={() => prevPage()}
            onSubmit={(e) => onSearch(e)}
            setSearch={setSearch}
          />
        </div>
        <div className={`${className}__grid__words`} id={`${className}__grid__words`}>
          <Words posWords={posWords} negWords={negWords} />
          <NewReviewForm onSubmit={submitReview} onClick={closeNew} />
          <NewReview onClick={newReview} />
        </div>
        <div className={`${className}__grid__chart`} id={`${className}__grid__chart`}>
          <ItemChart initData={chart} key={chart} itemId={itemId} token={token} />
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
};

Item.defaultProps = {
  className: 'item',
  id: 'item',
};

export default Item;
