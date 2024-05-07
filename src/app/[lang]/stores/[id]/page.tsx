import { Store } from '@/types/api.types';

import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout';
import { Coupons, PopularCategories, CouponList } from '@/components/UI';

import luckyGirlImg from '../../../../../public/images/lucky-girl.png';

export default async function StorePage(props: any) {
  try {
    const { store, coupons, bestCoupons, bestStores, popularCategories } = await getServerSideProps(
      props.params.lang,
      props.params.id
    );

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
        <div className="flex flex-col items-center justify-center border-1 border-gray rounded-3xl p-8">
          <Image
            className="h-36 w-36"
            height={200}
            width={200}
            src={store.icon}
            alt={store.store}
          />
          <h3>{store.store}</h3>
          <Link href="/">https:///dsasd.acom</Link>
          <p>sdadsaadsdasads sad asdas dasd as</p>
        </div>
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

async function getServerSideProps(lang: string, storeId: string) {
  const requests = [
    `/store/${storeId}}`,
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
    store: apis[0] as Store,
    coupons: apis[1],
    bestCoupons: apis[2],
    bestStores: apis[3] as Store[],
    popularCategories: apis[4]
  };
}
