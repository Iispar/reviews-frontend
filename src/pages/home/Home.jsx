import { useState, React } from 'react';
import propTypes from 'prop-types';
import LatestReviews from './LatestReviews';
import MostPopular from './MostPopular';
import HomeChart from './HomeChart';
import HomeStats from './HomeStats';
import dummyReviews from '../../data/dummyData/dummyReviews.json';
import dummyItems from '../../data/dummyData/dummyItems.json';

/**
 * Renders the home screen.
 * @property {String} className - Custom className if wanted. Default home.
 * @property {Strning} id - Custom id if wanted. Default home.
 * @returns home screen
 */
const Home = (props) => {
  const { className } = props;
  const { id } = props;
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState('Name');
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
          <LatestReviews reviews={dummyReviews.reviews} />
        </div>
        <div className={`${className}__grid__mostPopular`} id={`${id}__grid__mostPopular`}>
          <MostPopular items={dummyItems.items} />
        </div>
        <div className={`${className}__grid__homeChart`} id={`${id}__grid__homeChart`}>
          <HomeChart />
        </div>
        <div className={`${className}__grid__homeChange`} id={`${id}__grid__homeChange`}>
          <HomeStats />
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
