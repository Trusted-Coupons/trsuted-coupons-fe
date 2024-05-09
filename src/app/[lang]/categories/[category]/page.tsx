import type { Metadata } from 'next';
import type { Store } from '@/types/api.types';

import Layout from '@/components/layout';
import { Coupons, PopularCategories, CouponList } from '@/components/UI';

import luckyGirlImg from '../../../../../public/images/excited-girl.png';

export default async function CategoryPage(props: any) {
  try {
    const { coupons, bestCoupons, bestStores, popularCategories } = await getServerSideProps(
      props.params.lang
    );

    return (
      <Layout
        alpha={props.params.lang}
        jumbotronSrc={luckyGirlImg}
        kicker="Category"
        title={<span className="text-primary">Beauty</span>}
        subtitle="Get your Coupon today and save yourself up to 50% of your money">
        <Coupons withoutHeader={true} bestCoupons={bestCoupons} bestStores={bestStores}>
          <CouponList coupons={coupons} />
        </Coupons>
        <PopularCategories categories={popularCategories} />
      </Layout>
    );
  } catch (error) {
    return <div>Error fetching: {JSON.stringify(error)}</div>;
  }
}

async function getServerSideProps(lang: string) {
  const requests = [
    '/stores?page=1&perPage=50',
    '/coupons?page=1&perPage=10',
    '/coupons?page=1&perPage=5',
    '/stores?page=1&perPage=15',
    '/coupons?page=1&perPage=30'
  ];

  const apis = await Promise.all(
    requests.map((url) =>
      fetch(`${process.env.API_URL}/${lang}${url}`, {
        cache: 'no-cache'
      })
    )
  ).then(async (res) => Promise.all(res.map(async (data) => await data.json())));

  return {
    stores: apis[0] as Store[],
    coupons: apis[1],
    bestCoupons: apis[2],
    bestStores: apis[3] as Store[],
    popularCategories: apis[4]
  };
}

export async function generateMetadata(props: any): Promise<Metadata> {
  const { stores } = await getServerSideProps(props.params.lang);

  return {
    title: stores[0].store,
    description: stores[0].description,
    keywords: stores[0].keywords,
    icons: stores[0].icon
  };
}
