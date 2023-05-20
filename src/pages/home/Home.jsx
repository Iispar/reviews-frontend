import React from 'react';
import Header from '../../components/Header';
import LatestReviews from './LatestReviews';
import MostPopular from './MostPopular';
import HomeChart from './HomeChart';
import HomeStats from './HomeStats';
import Footer from '../../components/Footer';

// eslint-disable-next-line arrow-body-style
const Home = () => {
  return (
    <div className="home">
      <div className="home__header">
        <Header />
      </div>
      <div className="home__grid">
        <div className="home__grid__title">
          <div> Title </div>
        </div>
        <div className="home__grid__latestReviews">
          <LatestReviews />
        </div>
        <div className="home__grid__mostPopular">
          <MostPopular />
        </div>
        <div className="home__grid__homeChart">
          <HomeChart />
        </div>
        <div className="home__grid__homeChange">
          <HomeStats />
        </div>
      </div>
      <div className="home__footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
