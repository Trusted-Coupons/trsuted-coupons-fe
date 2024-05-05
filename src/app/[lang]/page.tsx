'use client';

import PopularCategories from '@/components/popularCategories';
import PopularStores from '@/components/popularStores';
import React, { useState } from 'react';
import Coupons from '@/components/Coupons';
import Layout from '@/components/layout';

const Home = () => {
  return (
    <Layout>
      <PopularStores />
      <Coupons />
      <PopularCategories />
    </Layout>
  );
};

export default Home;
