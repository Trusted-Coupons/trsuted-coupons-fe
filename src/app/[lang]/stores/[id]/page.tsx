import type { Metadata } from 'next';
import type { Category, Store } from '@/types/api.types';

import Image from 'next/image';
import Layout from '@/components/layout';
import { Coupons, PopularCategories, CouponList, StoreCard } from '@/components/UI';

export default async function StorePage(props: any) {
  try {
    const { store, popularCategories } = await getServerSideProps(
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
        subtitle="Get your Coupon today and save yourself up to 50% of your money"
      >
        {/* Container for two-column layout */}
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section: Coupon List and Popular Categories */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-col items-center justify-center border border-gray-200 rounded-3xl py-8 px-8 lg:px-36 gap-y-3">
                {/* Store Info Section */}
                <Image
                  className="h-36 w-36 rounded-3xl mb-3"
                  height={200}
                  width={200}
                  src={`https://logo.clearbit.com/${store.store}?height=200`}
                  alt={store.store}
                />
                <h3 className="h3 text-xl lg:text-2xl font-semibold">{store.store}</h3>
                <a
                  target="_blank"
                  className="font-light text-primary underline text-xs lg:text-sm"
                  href={`https://${store.store}`}
                >
                  {store.store}
                </a>
              </div>

              {/* Coupon List */}
              <CouponList coupons={store.coupons} />

              {/* Store Description */}
              <p className="font-light text-sm lg:text-base">{store.description}</p>

              {/* Popular Categories */}
              <PopularCategories categories={popularCategories} />
            </div>

            {/* Right Section: Store Card */}
            <div className="lg:col-span-1">
              <StoreCard
                logoUrl={`https://logo.clearbit.com/${store.store}?height=200`}
                storeName={store.store}
                description={store.description}
                countryCodes={store.storeAppearInCountries}
              />
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
  const requests = [
    `/store/${storeId}`,
    '/coupons?page=1&perPage=5',
    '/stores?page=1&perPage=15',
    '/categories'
  ];

  const apis = await Promise.all(
    requests.map((url) =>
      fetch(`${process.env.API_URL}/${lang}${url}`, {
        cache: 'no-cache'
      })
    )
  ).then(async (res) => Promise.all(res.map(async (data) => await data.json())));

  return {
    store: apis[0] as Store,
    bestCoupons: apis[1],
    bestStores: apis[2] as Store[],
    popularCategories: apis[3] as Category[]
  };
}

export async function generateMetadata(props: any): Promise<Metadata> {
  const { store } = await getServerSideProps(props.params.lang, props.params.id);

  return {
    title: store.storeMetadata[0].metadata_title,
    description: store.storeMetadata[0].metadata_title,
    keywords: store.keywords,
    icons: store.icon
  };
}
