import type { Metadata } from 'next';
import type { Category, Store } from '@/types/api.types';

import Layout from '@/components/layout';
import { PopularStores, Coupons, PopularCategories, CouponList } from '@/components/UI';
import luckyGirlImg from '../../../public/images/lucky-girl.png';
import { useState } from 'react';
import StoresByCategoriesList from '@/components/UI/StoresByCategoriesList';
import MostSearchedStoresList from '@/components/UI/MostSearchedStoresList';

export const metadata: Metadata = {
  title: 'Trusted Coupons',
  description: 'Lorem Ipsum is Lorem Ipsum',
  keywords: 'Trusted, Coupons'
};

export default async function HomePage(props: any) {
  const page = props.searchParams?.page || 1;
  const lang = props.params.lang;

  try {
    // Fetch data inside the component
    const { stores, popularCategories, allStores } = await fetchData(page, lang);

    const getStoresSortedByHighestRatedCoupon = (storesList: Store[]): any[] => {
      // Map through the stores to find the highest-rated coupon for each store
      const storesWithHighestRatedCoupons: any[] = storesList.map((store) => {
        // Find the highest-rated coupon in the store's coupons array
        const highestRatedCoupon = store.coupons.reduce((highest, current) => {
          return current.rating > (highest?.rating || 0) ? current : highest;
        }, store.coupons[0]);

        // Return only the relevant fields and highest rating for sorting later
        return {
          id: store.id,
          store: store.store,
          coupons: store.coupons,
          allCategoriesArr: store.ourCategories,
          highestRating: highestRatedCoupon.rating
        };
      });

      // Sort the stores in descending order by their highest coupon rating
      const sortedStores = storesWithHighestRatedCoupons.sort(
        (a, b) => b.highestRating - a.highestRating
      );

      return sortedStores;
    };

    const getTop8DistinctCategories = (storesList: any[]): string[] => {
      const categoriesSet = new Set<string>();

      for (const store of storesList) {
        // Convert the stringified array into a real array
        const categoriesArray = JSON.parse(store.allCategoriesArr.replace(/'/g, '"'));

        // Take the first category from the array and check if it's already in the set
        if (categoriesArray.length > 0 && !categoriesSet.has(categoriesArray[0])) {
          categoriesSet.add(categoriesArray[0]);

          // Stop if we have already found 8 distinct categories
          if (categoriesSet.size === 8) {
            break;
          }
        }
      }

      // Convert the Set back to an array and return it
      return Array.from(categoriesSet);
    };

    const sortedStores = getStoresSortedByHighestRatedCoupon(stores);

    const top8Categories = getTop8DistinctCategories(sortedStores);

    const travelCategories = Object.keys(allStores)
      .filter((category) => category.toLowerCase().includes('travel'))
      .reduce((result: any, category: any) => {
        result[category] = allStores[category];
        return result;
      }, {});

    const fashionCategories = Object.keys(allStores)
      .filter((category) => category.toLowerCase().includes('fashion'))
      .reduce((result: any, category: any) => {
        result[category] = allStores[category];
        return result;
      }, {});

    const beautyCategories = Object.keys(allStores)
      .filter((category) => category.toLowerCase().includes('beauty'))
      .reduce((result: any, category: any) => {
        result[category] = allStores[category];
        return result;
      }, {});

    const foodCategories = Object.keys(allStores)
      .filter((category) => category.toLowerCase().includes('food'))
      .reduce((result: any, category: any) => {
        result[category] = allStores[category];
        return result;
      }, {});

    const getTopStores = (stores: Store[]): Store[] => {
      if (!Array.isArray(stores) || stores.length === 0) {
        return [];
      }

      // Sort stores by `monthlyVisits` in descending order
      const sortedStores = [...stores].sort((a, b) => b.monthlyVisits - a.monthlyVisits);

      // Get the top 8 stores
      return sortedStores.slice(0, 8);
    };

    const topStores = getTopStores(stores);

    return (
      <Layout
        alpha={lang}
        jumbotronSrc={luckyGirlImg}
        kicker="Saving your money since 2024"
        title={
          <>
            <span className="text-primary">20.000+</span> Coupons{' '}
            <span className="text-primary">1.000+</span> Stores
          </>
        }
        subtitle="Get your Coupon today and save yourself up to 50% of your money">
        <div>
          <div className={`flex flex-col`}>
            <div className="flex flex-col md:flex-row gap-x-10 gap-y-10 justify-center">
              <div className="flex flex-col gap-10">
                <MostSearchedStoresList storesList={topStores} />
                <StoresByCategoriesList
                  storeHeading={'Popular Travel'}
                  storeByCategorie={travelCategories}
                />
                <StoresByCategoriesList
                  storeHeading={'Popular Fashion'}
                  storeByCategorie={fashionCategories}
                />
                <StoresByCategoriesList
                  storeHeading={'Popular Beauty'}
                  storeByCategorie={beautyCategories}
                />
                <StoresByCategoriesList
                  storeHeading={'Popular Food'}
                  storeByCategorie={foodCategories}
                />
              </div>
              <div className="w-full flex-col md:flex md:max-w-[20rem] lg:max-w-[25rem] lg:gap-y-6">
                <div className="border-1 mb-8 border-gray rounded-3xl p-6 lg:p-8 lg:mb-0">
                  {/* sidebar */}
                  <h3 className="text-lg pb-6 font-medium md:text-xl lg:text-2xl">
                    Welcome to trusted.<span className="text-primary">coupons</span>
                  </h3>
                  <p>
                    We provide you with a huge selection of vouchers and voucher codes for the most
                    popular online shops across 94 countries!
                    <br />
                    <br />
                    Savings portal trusted.coupons – save money with vouchers when shopping smart
                    Trusted.coupons is a leading global savings portal. By using the free vouchers
                    and voucher codes on our website, clever shoppers can save money on every
                    purchase in numerous online shops worldwide. There are many good reasons to use
                    savings portals in general and trusted.coupons in particular.
                  </p>
                </div>
                <PopularCategories categories={top8Categories} />
                <div className="flex flex-col border-1 border-gray rounded-3xl p-6 lg:p-8">
                  <h3 className="text-lg pb-6 font-medium md:text-xl lg:text-2xl">
                    Email Newsletter
                  </h3>
                  <p className="font-light text-xs lg:text-sm opacity-60 mb-6">
                    Your email is safe with us and we hate spam as much as you do. Lorem ipsum dolor
                    sit amet et dolore.
                  </p>
                  <input
                    className="bg-gray rounded-full p-2 px-6 text-sm outline-none mb-4 opacity-60"
                    placeholder="Enter your name..."
                  />
                  <input
                    className="bg-gray rounded-full py-2 px-6 text-sm outline-none mb-4 opacity-60"
                    placeholder="Enter your email..."
                  />
                  <button className="bg-primary rounded-full py-2 text-white text-sm">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <PopularCategories categories={popularCategories} /> */}
      </Layout>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error fetching: {JSON.stringify(error)}</div>;
  }
}

// Separate data fetching logic
async function fetchData(page: number, lang: string) {
  const requests = [
    `/stores?page=${page}&perPage=10`,
    '/coupons?page=1&perPage=10',
    '/coupons?page=1&perPage=5',
    '/stores?page=1&perPage=15',
    '/categories',
    '/stores-all'
  ];

  try {
    const responses = await Promise.all(
      requests.map(async (url) => {
        const response = await fetch(`${process.env.API_URL}/${lang}${url}`, { cache: 'no-cache' });

        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}. Status: ${response.status}`);
        }

        return response.json();
      })
    );

    return {
      stores: responses[0] as Store[],
      coupons: responses[1],
      bestCoupons: responses[2],
      bestStores: responses[3] as Store[],
      popularCategories: responses[4] as Category[],
      allStores: responses[5] as any[]
    };
  } catch (error: any) {
    console.error('Error in fetchData:', error.message);
    throw error;
  }
}
