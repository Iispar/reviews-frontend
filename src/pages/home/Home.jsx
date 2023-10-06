import {
  useState, React, useEffect, useRef,
} from 'react';
import $ from 'jquery';
import propTypes from 'prop-types';
import LatestReviews from './LatestReviews';
import MostPopular from './MostPopular';
import HomeChart from './HomeChart';
import HomeStats from './HomeStats';
import pagesService from '../../services/pagesService';
import { useGetLocalStorage } from '../../helpers/helperHooks';
import { useGetReviewsForAccount } from './homeHooks';
import SkeletonLoad from '../../components/SkeletonLoad';

/**
 * Renders the home screen.
 * @property {String} className - Custom className if wanted. Default home.
 * @property {Strning} id - Custom id if wanted. Default home.
 * @returns home screen
 */
const Home = ({ className, id }) => {
  const [latestReviews, setLatestReviews] = useState(null);
  const [topItems, setTopItems] = useState(null);
  const [itemCount, setItemCount] = useState(null);
  const [reviewCount, setReviewCount] = useState(null);
  const [ratingAvg, setRatingAvg] = useState(null);
  const [chart, setChart] = useState(null);
  const [barChart, setBarChart] = useState([]);
  const [accountId, setAccountId] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isNextPage, setIsNextPage] = useState(true);
  const [loading, setLoading] = useState(1);
  const page = useRef(0);

  /**
   * UseEffect hook to call and set the data on initialization.
   */
  useEffect(() => {
    const storage = useGetLocalStorage();

    setToken(storage.token);
    setAccountId(storage.accountId);

    pagesService.getHome(storage.accountId, storage.token)
      .then((res) => {
        setUser(res.accountName);
        setLatestReviews(res.latestReviews.responseList);
        setTopItems(res.topItems);
        setItemCount(res.itemsCount);
        setReviewCount(res.reviewsCount);
        setRatingAvg(res.ratingsAvg);
        setChart(res.chart);
        setBarChart(res.barChart);
        setLoading(0);
        page.current = 0;
      })
      .catch(() => {
        setLoading(7);
      });
  }, []);

  /**
   * Useeffect to check if page is the last one with values.
   */
  useEffect(() => {
    if (isNextPage) $('#pagination__next').prop('disabled', false);
    else $('#pagination__next').prop('disabled', true);
  }, [isNextPage]);

  /**
   * UseEffect to disable prev so we dont do into negative pages.
   */
  useEffect(() => {
    if (page.current <= 0) $('#pagination__prev').prop('disabled', true);
    else $('#pagination__prev').prop('disabled', false);
  }, [page.current]);

  /**
   * Function to move to load the next page of reviews
   */
  const nextPage = () => {
    setLoading(2);
    useGetReviewsForAccount(
      accountId,
      page.current + 1,
      token,
      setLatestReviews,
      setIsNextPage,
      setLoading,
    );
    page.current += 1;
  };

  /**
     * Function to move to load the previous page of reviews
     */
  const prevPage = () => {
    setLoading(2);
    useGetReviewsForAccount(
      accountId,
      page.current - 1,
      token,
      setLatestReviews,
      setIsNextPage,
      setLoading,
    );
    page.current -= 1;
  };

  if (loading === 7) (<div> error while fetching data, please try again </div>);
  return (
    <div className={className} id={id}>
      <div className={`${className}__grid`} id={`${className}__grid`}>
        <div className={`${className}__grid__title`}>
          {user ? (
            <div className={`${className}__grid__title__text`} id={`${className}__grid__title__text`}>
              Welcome&nbsp;
              {user}
              !
            </div>
          ) : (<SkeletonLoad />)}
        </div>
        <div className={`${className}__grid__latestReviews`} id={`${id}__grid__latestReviews`}>
          <LatestReviews
            reviews={latestReviews}
            accountId={accountId}
            token={token}
            key={latestReviews}
            nextPage={nextPage}
            prevPage={prevPage}
            loading={loading}
          />
        </div>
        <div className={`${className}__grid__mostPopular`} id={`${id}__grid__mostPopular`}>
          <MostPopular items={topItems} />
        </div>
        <div className={`${className}__grid__homeChart`} id={`${id}__grid__homeChart`}>
          <HomeChart
            initData={chart}
            key={chart}
            accountId={accountId}
            token={token}
            initLoading={loading}
          />
        </div>
        <div className={`${className}__grid__homeStats`} id={`${id}__grid__homeStats`}>
          <HomeStats
            barChartData={barChart}
            itemCount={itemCount}
            reviewCount={reviewCount}
            ratingAvg={ratingAvg}
          />
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  className: propTypes.string,
  id: propTypes.string,
};

Home.defaultProps = {
  className: 'home',
  id: 'home',
};

export default Home;
