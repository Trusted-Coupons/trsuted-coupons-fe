import type { Metadata } from 'next';
import type { Category, Store } from '@/types/api.types';

import Image from 'next/image';
import Layout from '@/components/layout';
import {
  Coupons,
  PopularCategories,
  CouponList,
  StoreCard,
  PopularCategoriesNew
} from '@/components/UI';
import StoresByCategory from '@/components/UI/StoresByCategory';
import CouponsByCategories from '@/components/UI/CouponsByCategories';

export default async function StorePage(props: any) {
  try {
    const { store, storesByCategory, category } = await getServerSideProps(
      props.params.lang,
      props.params.id
    );

    return (
      <Layout
        alpha={props.params.lang}
        kicker="Saving your money since 2024"
        title={
          <>
            <span className="text-primary">20.000+</span> Coupons{' '}
            <span className="text-primary">1.000+</span> Stores
          </>
        }
        subtitle="Get your Coupon today and save yourself up to 50% of your money">
        {/* Container for two-column layout */}
        <div className="container mx-auto py-8">
          <div className="flex gap-8 justify-center items-start">
            {/* Left Section: Coupon List and Popular Categories */}
            <div className="lg:col-span-2 space-y-6 ">
              {/* Coupon List */}
              <CouponList
                coupons={store.coupons}
                store={store.store}
                description={store.description}
              />
            </div>

            {/* Right Section: Store Card */}
            <div className="w-full flex flex-col md:flex md:max-w-[20rem] lg:max-w-[25rem] lg:gap-y-6 ">
              <StoreCard
                logoUrl={`https://logo.clearbit.com/${store.store}?height=200`}
                storeName={store.store}
                description={store.description}
                countryCodes={store.storeAppearInCountries}
                storeId={props.params.id}
              />
              <StoresByCategory storesList={storesByCategory} category={category} />
              <PopularCategoriesNew categories={store.ourCategories} />
              <CouponsByCategories storesList={storesByCategory} category={category} />
            </div>
          </div>
        </div>
      </Layout>
    );
  } catch (error) {
    return <div>Error fetching: {JSON.stringify(error)}</div>;
  }
}

async function getServerSideProps(lang: string, storeId: string) {
  try {
    // Fetch store data
    const data = await fetchStoreData(lang, storeId);
    const ourCategory = data.storeData.ourCategories;
    const jsonString = ourCategory.replace(/'/g, '"');

    // Parse the JSON string into an array
    const arrayData = JSON.parse(jsonString);
    // Fetch stores by category
    const storesByCategory = await fetchStoresByCategory(lang, arrayData[0]);

    return {
      store: data.storeData as any,
      storesByCategory: storesByCategory as any,
      category: arrayData[0]
    };
  } catch (error) {
    return {
      props: { error: 'Failed to fetch data' }
    };
  }
}

async function fetchStoresByCategory(lang: string, category: string) {
  const response = await fetch(
    `${process.env.API_URL}/${lang}/stores-by-category?category=${category}`,
    {
      cache: 'no-cache'
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch stores by category');
  }
  const storesByCategory = await response.json();
  return storesByCategory;
}

async function fetchStoreData(lang: string, storeId: string) {
  const requests = [`/store/${storeId}`];

  const apis = await Promise.all(
    requests.map((url) =>
      fetch(`${process.env.API_URL}/${lang}${url}`, {
        cache: 'no-cache'
      })
    )
  ).then(async (res) => Promise.all(res.map(async (data) => await data.json())));

  return {
    storeData: apis[0] as Store
  };
}

export async function generateMetadata(props: any): Promise<Metadata> {
  const { storeData } = await fetchStoreData(props.params.lang, props.params.id);

  return {
    title: storeData.storeMetadata[0].metadata_title,
    description: storeData.storeMetadata[0].metadata_title,
    keywords: storeData.keywords,
    icons: storeData.icon
  };
}
