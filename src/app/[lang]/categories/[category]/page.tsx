import Layout from '@/components/layout';
import { PopularStores, Coupons, PopularCategories } from '@/components/UI';

import luckyGirlImg from '../../../../../public/images/excited-girl.png';
import { Store } from '@/types/api.types';

export interface Category {
  id: number;
  name: string;
}

export default async function CategoryPage(props: any) {
  try {
    const { stores, coupons, bestCoupons, bestStores, popularCategories } =
      await getServerSideProps(props.params.lang);

    return (
      <Layout
        alpha={props.params.lang}
        jumbotronSrc={luckyGirlImg}
        kicker="Category"
        title={<span className="text-primary">Beauty</span>}
        subtitle="Get your Coupon today and save yourself up to 50% of your money">
        <Coupons
          withoutHeader={true}
          coupons={coupons}
          bestCoupons={bestCoupons}
          bestStores={bestStores}
        />
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
