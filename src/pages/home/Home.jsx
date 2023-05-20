import { useState, React } from 'react';
import Header from '../../components/Header';
import LatestReviews from './LatestReviews';
import MostPopular from './MostPopular';
import HomeChart from './HomeChart';
import HomeStats from './HomeStats';
import Footer from '../../components/Footer';

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState('Name');
  return (
    <div className="home">
      <div className="home__header">
        <Header />
      </div>
      <div className="home__grid">
        <div className="home__grid__title">
          <div className="home__grid__title__text">
            Welcome back&nbsp;
            {user}
          </div>
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
        <div className="home__grid__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
