import React from 'react';
import { Link } from 'react-router-dom';

import HomeComponent from './components/HomeComponent';

const Home = () => (
  <div>
    <HomeComponent />
    <Link to="/interet">inteeret</Link>
  </div>
);

export default Home;
