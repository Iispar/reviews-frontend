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

/**
 * Renders the home screen.
 * @property {String} className - Custom className if wanted. Default home.
 * @property {Strning} id - Custom id if wanted. Default home.
 * @returns home screen
 */
const Home = ({ className, id }) => {
  const [latestReviews, setLatestReviews] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [itemCount, setItemCount] = useState(null);
  const [reviewCount, setReviewCount] = useState(null);
  const [ratingAvg, setRatingAvg] = useState(null);
  const [chart, setChart] = useState([]);
  const [barChart, setBarChart] = useState([]);
  const [accountId, setAccountId] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
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
        setLatestReviews(res.latestReviews);
        setTopItems(res.topItems);
        setItemCount(res.itemsCount);
        setReviewCount(res.reviewsCount);
        setRatingAvg(res.ratingsAvg);
        setChart(res.chart);
        setBarChart(res.barChart);
      });
  }, []);

  /**
   * Function to move to load the next page of reviews
   */
  const nextPage = () => {
    $('#pagination__prev').prop('disabled', false);
    useGetReviewsForAccount(accountId, page.current + 1, token, setLatestReviews);
    page.current += 1;
  };

  /**
     * Function to move to load the previous page of reviews
     */
  const prevPage = () => {
    useGetReviewsForAccount(accountId, page.current - 1, token, setLatestReviews);
    page.current -= 1;
    if (page.current === 0) {
      $('#pagination__prev').prop('disabled', true);
    }
  };

  return (
    <div className={className} id={id}>
      <div className={`${className}__grid`} id={`${className}__grid`}>
        <div className={`${className}__grid__title`}>
          <div className={`${className}__grid__title__text`} id={`${className}__grid__title__text`}>
            Welcome back&nbsp;
            {user}
            !
          </div>
        </div>
        <div className={`${className}__grid__latestReviews`} id={`${id}__grid__latestReviews`}>
          <LatestReviews
            reviews={latestReviews}
            accountId={accountId}
            token={token}
            key={latestReviews}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </div>
        <div className={`${className}__grid__mostPopular`} id={`${id}__grid__mostPopular`}>
          <MostPopular items={topItems} />
        </div>
        <div className={`${className}__grid__homeChart`} id={`${id}__grid__homeChart`}>
          <HomeChart initData={chart} key={chart} accountId={accountId} token={token} />
        </div>
        <div className={`${className}__grid__homeChange`} id={`${id}__grid__homeChange`}>
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
