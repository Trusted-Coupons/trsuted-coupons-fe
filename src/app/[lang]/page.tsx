import Layout from '@/components/layout';
import { PopularStores, Coupons, PopularCategories } from '@/components/UI';

import luckyGirlImg from '../../../public/images/lucky-girl.png';
import { Store } from '@/types/api.types';
import CouponList from '@/components/UI/CouponList';

export default async function HomePage(props: any) {
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
        <PopularStores stores={stores} />
        <Coupons bestCoupons={bestCoupons} bestStores={bestStores}>
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
