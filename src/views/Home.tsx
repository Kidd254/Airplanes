import React from 'react';
import Layout from './Layout';
import MainPage from '../components/MainPage';

const Home: React.FC = () => (
  <Layout>
    <section id="rockets">
      <div className="container">
        <MainPage />
      </div>
    </section>
  </Layout>
);

export default Home;
