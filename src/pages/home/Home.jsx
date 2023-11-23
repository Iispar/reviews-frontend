import React, {
  useState, useEffect, useRef,
} from 'react';
import propTypes from 'prop-types';
import LatestReviews from './LatestReviews';
import MostPopular from './MostPopular';
import HomeChart from './HomeChart';
import HomeStats from './HomeStats';
import pagesService from '../../services/pagesService';
import { UseGetLocalStorage } from '../../helpers/helperHooks';
import { UseGetReviewsForAccount } from './homeHooks';
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
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const page = useRef(1);

  /**
   * UseEffect hook to call and set the data on initialization.
   */
  useEffect(() => {
    const storage = UseGetLocalStorage();

    setToken(storage.token);
    setAccountId(storage.accountId);

    pagesService.getHome(storage.accountId, storage.token)
      .then((res) => {
        setUser(res.accountName);
        setLatestReviews(res.latestReviews.responseList);
        if (!res.latestReviews.nextPage) setIsNextPage(false);
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
    if (isNextPage) setNextDisabled(false);
    else setNextDisabled(true);
  }, [isNextPage]);

  /**
   * UseEffect to disable prev so we dont do into negative pages.
   */
  useEffect(() => {
    if (page.current <= 0) setPrevDisabled(true);
    else setPrevDisabled(false);
  }, [page.current]);

  /**
   * Function to move to load the next page of reviews
   */
  const nextPage = () => {
    setLoading(2);
    UseGetReviewsForAccount(
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
    UseGetReviewsForAccount(
      accountId,
      page.current - 1,
      token,
      setLatestReviews,
      setIsNextPage,
      setLoading,
    );
    page.current -= 1;
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
      <div className={`${className}__grid`} id={`${className}__grid`}>
        <div className={`${className}__grid__title`}>
          {user ? (
            <div className={`${className}__grid__title__text`} id={`${className}__grid__title__text`}>
              Welcome&nbsp;
              {user}
              !
            </div>
          ) : (<SkeletonLoad id={`${id}__skeletonLoad`} />)}
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
            prevDisabled={prevDisabled}
            nextDisabled={nextDisabled}
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
