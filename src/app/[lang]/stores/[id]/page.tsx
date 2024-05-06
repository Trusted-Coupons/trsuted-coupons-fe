import Layout from '@/components/layout';
import { PopularStores, Coupons, PopularCategories, Store } from '@/components/UI';

import luckyGirlImg from '../../../../../public/images/lucky-girl.png';

export interface Coupon {
  id: number;
  offer_id: number;
  title: string;
  description: string;
  label: string;
  code: string;
  featured: boolean;
  source: string;
  deeplink: string;
  affiliate_link: string;
  cashback_link: string;
  url: string;
  image_url: string;
  brand_logo: string;
  type: 'Code';
  store: string;
  merchant_home_page: string;
  categories: string;
  standard_categories: string;
  start_date: string;
  end_date: string;
  status: string;
  primary_location: string;
  rating: null;
  table_name: string;
}

export default async function StorePage(props: any) {
  try {
    const { stores, coupons, bestCoupons, bestStores, popularCategories } =
      await getServerSideProps(props.params.lang);

    return (
      <Layout
        alpha={props.params.lang}
        jumbotronSrc={luckyGirlImg}
        kicker="Saving your money since 2024"
        title={
          <>
            <span className="text-primary">20.000+</span> Coupons{' '}
            <span className="text-primary">1.000+</span> Stores
          </>
        }
        subtitle="Get your Coupon today and save yourself up to 50% of your money">
        <Store />
        <Coupons coupons={coupons} bestCoupons={bestCoupons} bestStores={bestStores} />
        <PopularCategories categories={popularCategories} />
      </Layout>
    );
  } catch (error) {
    return <div>Error fetching: {JSON.stringify(error)}</div>;
  }
}

async function getServerSideProps(lang: string) {
  const requests = [
    '/coupons?page=1&perPage=50',
    '/coupons?page=1&perPage=10',
    '/coupons?page=1&perPage=5',
    '/coupons?page=1&perPage=5',
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
    stores: apis[0],
    coupons: apis[1],
    bestCoupons: apis[2],
    bestStores: apis[3],
    popularCategories: apis[4]
  };
}
