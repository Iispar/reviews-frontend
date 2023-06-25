import { useState, React } from 'react';
import Header from '../../components/Header';
import LatestReviews from './LatestReviews';
import MostPopular from './MostPopular';
import HomeChart from './HomeChart';
import HomeStats from './HomeStats';
import Footer from '../../components/Footer';
import dummyReviews from '../../data/dummyData/dummyReviews.json';
import dummyItems from '../../data/dummyData/dummyItems.json';

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState('Name');
  return (
    <div className="home" id="home">
      <div className="home__grid" id="home__grid">
        <div className="home__grid__header" id="home__grid__header">
          <Header />
        </div>
        <div className="home__grid__title">
          <div className="home__grid__title__text" id="home__grid__title__text">
            Welcome back&nbsp;
            {user}
            !
          </div>
        </div>
        <div className="home__grid__latestReviews" id="home__grid__latestReviews">
          <LatestReviews reviews={dummyReviews.reviews} />
        </div>
        <div className="home__grid__mostPopular" id="home__grid__mostPopular">
          <MostPopular items={dummyItems.items} />
        </div>
        <div className="home__grid__homeChart" id="home__grid__homeChart">
          <HomeChart />
        </div>
        <div className="home__grid__homeChange" id="home__grid__homeChange">
          <HomeStats />
        </div>
        <div className="home__grid__footer" id="home__grid__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
