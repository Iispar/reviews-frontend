/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import $ from 'jquery';
import { useParams, useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';
import Title from './Title';
import Words from './Words';
import ItemChart from './ItemChart';
import Reviews from './Reviews';
import NewReviewForm from './NewReviewForm';
import pagesService from '../../services/pagesService';
import { UseNewReview, UseGetReviews } from './itemHooks';
import SkeletonLoad from '../../components/SkeletonLoad';
import ActionWait from '../../components/ActionWait';
import parseInputFile from '../../helpers/ParseInputFile';
import { UseGetLocalStorage } from '../../helpers/helperHooks';
import itemService from '../../services/itemService';

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
  const [isNextPage, setIsNextPage] = useState(true);
  const [loading, setLoading] = useState(1);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [newView, setNewView] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const page = useRef(0);

  const navigate = useNavigate();

  /**
   * UseEffect to get data at page load.
   */
  useEffect(() => {
    const storage = UseGetLocalStorage();

    setToken(storage.token);
    setAccountId(storage.accountId);

    pagesService.getItem(itemId, storage.token)
      .then((res) => {
        setReviews(res.reviews.responseList);
        if (!res.reviews.nextPage) setIsNextPage(false);
        if (res.topPos == null) {
          setPosWords([]);
          setNegWords([]);
        } else {
          setPosWords(res.topPos.slice(0, 5));
          setNegWords(res.topNeg.slice(0, 5));
        }
        setChart(res.chart);
        setTitle(res.title);
        setRating(res.rating.toString());
        setReviewsCount(res.reviewsCount);
        setPosReviews(res.positiveReviews);
        setNegReviews(res.negativeReviews);
        setLoading(0);
      })
      .catch(() => {
        setLoading(7);
      });
  }, []);

  /**
   * UseEffect to check if next page of results is empty.
   */
  useEffect(() => {
    if (isNextPage) setNextDisabled(false);
    else setNextDisabled(true);
  }, [isNextPage]);

  const reloadReviews = () => {
    setLoading(2);
    const formattedSort = sort !== 'none' ? `review_${sort}` : sort;
    UseGetReviews(
      itemId,
      search,
      page.current,
      formattedSort,
      sortDir,
      token,
      setReviews,
      setIsNextPage,
      setLoading,
    );
  };

  /**
   * Function to create new review.
   * @param {Function} e
   *        Event that is called with.
   */
  const submitReview = async (e) => {
    setLoading(4);
    e.preventDefault();
    let list;
    // if file input is not empty.
    if (e.target.elements[3].files[0]) {
      list = await parseInputFile(e.target.elements[3].files[0]);
      const reload = () => window.location.reload();
      UseNewReview(itemId, accountId, list, token, reload, setLoading);
    } else {
      list = [];
      list.push({
        title: e.target.elements[0].value,
        body: e.target.elements[1].value,
        date: e.target.elements[2].value,
      });
      UseNewReview(itemId, accountId, list, token, reloadReviews, setLoading);
    }
    $(e.target.elements[0]).val('');
    $(e.target.elements[1]).val('');
    $(e.target.elements[2]).val('');
  };

  /**
   * Function to load the next page of reviews
   */
  const nextPage = () => {
    setLoading(2);
    const formattedSort = sort !== 'none' ? `review_${sort}` : sort;
    setPrevDisabled(false);
    UseGetReviews(
      itemId,
      search,
      page.current + 1,
      formattedSort,
      sortDir,
      token,
      setReviews,
      setIsNextPage,
      setLoading,
    );
    page.current += 1;
  };

  /**
     * Function to load the previous page of reviews
     */
  const prevPage = () => {
    setLoading(2);
    const formattedSort = sort !== 'none' ? `review_${sort}` : sort;
    UseGetReviews(
      itemId,
      search,
      page.current - 1,
      formattedSort,
      sortDir,
      token,
      setReviews,
      setIsNextPage,
      setLoading,
    );
    page.current -= 1;
    if (page.current === 0) {
      setPrevDisabled(true);
    }
  };

  /**
   * Function to search with search
   * @param {Function} e
   *        event that is called with.
   */
  const onSearch = (e) => {
    setLoading(2);
    page.current = 0;
    const formattedSort = sort !== 'none' ? `review_${sort}` : sort;
    e.preventDefault();
    UseGetReviews(
      itemId,
      search,
      page.current,
      formattedSort,
      sortDir,
      token,
      setReviews,
      setIsNextPage,
      setLoading,
    );
  };

  /**
   * Function to search with selected sort.
   * @param {String} selSort
   *        Sort that was selected.
   * @param {String} selSortDir
   *        Sort direction that was selected.
   */
  const searchSort = (selSort, selSortDir) => {
    setLoading(2);
    page.current = 0;
    setSort(selSort);
    setSortDir(selSortDir);

    UseGetReviews(itemId, search, page.current, `review_${selSort}`, selSortDir, token, setReviews, setIsNextPage, setLoading);
  };

  /**
   * Shows the confirm delete buttons.
   */
  const confirmDeletion = () => {
    setConfirm(true);
  };

  /**
   * Calls the service to delete current item from database
   */
  const deleteItem = (deletion) => {
    if (deletion) {
      setLoading(4);
      itemService.deleteItem(itemId, token)
        .then(() => {
          setLoading(5);
          setTimeout(() => {
            setLoading(0);
            navigate('/all');
          }, 1000);
        })
        .catch(() => {
          setLoading(6);
          setTimeout(() => {
            setLoading(0);
          }, 3000);
        });
    } else {
      setConfirm(false);
    }
  };

  /**
   * Clears the search input when the X is pressed.
   */
  const clearSearch = () => {
    setLoading(2);
    page.current = 0;
    setPrevDisabled(true);
    setSearch('');
    const formattedSort = sort !== 'none' ? `review_${sort}` : sort;
    UseGetReviews(itemId, '', 0, formattedSort, sortDir, token, setReviews, setIsNextPage, setLoading);
  };

  // if error while fetching at useState display error page.
  if (loading === 7) {
    return (
      <div className={className} id={id}>
        <div> error while fetching data, please try again </div>
      </div>
    );
  }
  return (
    <div className={className} id={id}>
      <div className={`${className}__grid`}>
        <div className={`${className}__grid__title`} id={`${className}__grid__title`}>
          { title ? (
            <Title
              name={title}
              reviewsCount={reviewsCount}
              ratingValue={rating}
              posReviews={posReviews}
              negReviews={negReviews}
              testId="test"
            />

          ) : (
            <SkeletonLoad />
          )}
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
            clearSearch={clearSearch}
            loading={loading}
            nextDisabled={nextDisabled}
            prevDisabled={prevDisabled}
          />
        </div>
        <div className={`${className}__grid__words`} id={`${className}__grid__words`}>
          <Words posWords={posWords} negWords={negWords} view={newView} />
          <NewReviewForm onSubmit={submitReview} onClick={() => setNewView(false)} view={newView} />
          {loading === 1 ? (
            <div className={`${className}__grid__words__selection`} id={`${id}__grid__words__selection`}>
              <SkeletonLoad />
            </div>
          ) : (
            <div className={`${className}__grid__words__selection`} id={`${id}__grid__words__selection`} style={newView ? { display: 'none' } : { display: 'flex' }}>
              <button className={`${className}__grid__words__selection__new`} id={`${id}__grid__words__selection__new`} type="button" onClick={() => setNewView(true)} style={confirm ? { display: 'none' } : { display: 'flex' }}> new review </button>
              <button className={`${className}__grid__words__selection__delete`} id={`${id}__grid__words__selection__delete`} type="button" onClick={() => confirmDeletion()} style={confirm ? { display: 'none' } : { display: 'flex' }}> delete </button>
              <div className={`${className}__grid__words__selection__confirmDelete`} id={`${id}__grid__words__selection__confirmDelete`} style={confirm ? { display: 'flex' } : { display: 'none' }}>
                <span className={`${className}__grid__words__selection__confirmDelete__text`}>Are you sure?</span>
                <button className={`${className}__grid__words__selection__confirmDelete__wantedDelete`} id={`${id}__grid__words__selection__confirmDelete__wantedDelete`} type="button" onClick={() => deleteItem(true)}> yes </button>
                <button className={`${className}__grid__words__selection__confirmDelete__cancelDelete`} id={`${id}__grid__words__selection__confirmDelete__cancelDelete`} type="button" onClick={() => deleteItem(false)}> no </button>
              </div>
            </div>
          )}
        </div>
        <div className={`${className}__grid__chart`} id={`${className}__grid__chart`}>
          <ItemChart
            initData={chart}
            key={chart}
            itemId={itemId}
            token={token}
            initLoading={loading}
          />
        </div>
      </div>
      {loading === 4 || loading === 5 || loading === 6 ? (
        <ActionWait id="itemActionWait" loading={loading} />
      ) : (<div />)}
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
