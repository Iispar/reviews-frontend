import { useState, React, useEffect } from 'react';
import propTypes from 'prop-types';
import LatestReviews from './LatestReviews';
import MostPopular from './MostPopular';
import HomeChart from './HomeChart';
import HomeStats from './HomeStats';
import homeService from '../../services/homeService';

/**
 * Renders the home screen.
 * @property {String} className - Custom className if wanted. Default home.
 * @property {Strning} id - Custom id if wanted. Default home.
 * @returns home screen
 */
const Home = (props) => {
  const [latestReviews, setLatestReviews] = useState(null);
  const [topItems, setTopItems] = useState(null);
  const [itemCount, setItemCount] = useState(null);
  const [reviewCount, setReviewCount] = useState(null);
  const [ratingAvg, setRatingAvg] = useState(null);
  const [chart, setChart] = useState(null);
  const [barChart, setBarChart] = useState(null);

  const { className } = props;
  const { id } = props;
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState('Name');

  useEffect(() => {
    const token = window.localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
    homeService.getHome(5, token)
      .then((res) => {
        setLatestReviews(res.latestReviews);
        setTopItems(res.topItems);
        setItemCount(res.itemsCount);
        setReviewCount(res.reviewsCount);
        setRatingAvg(res.ratingsAvg);
        setChart(res.chart);
        setBarChart(res.barChart.sort((a, b) => a.rating - b.rating));
      });
  }, []);

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
          <LatestReviews reviews={latestReviews} />
        </div>
        <div className={`${className}__grid__mostPopular`} id={`${id}__grid__mostPopular`}>
          <MostPopular items={topItems} />
        </div>
        <div className={`${className}__grid__homeChart`} id={`${id}__grid__homeChart`}>
          <HomeChart curData={chart} />
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
