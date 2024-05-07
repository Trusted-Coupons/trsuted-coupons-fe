import Layout from '@/components/layout';
import { Stores, Coupons, PopularCategories } from '@/components/UI';
import type { Store } from '@/types/api.types';

import luckyGirlImg from '../../../../public/images/confident-girl.png';

export default async function StoresPage(props: any) {
  try {
    const { stores, bestCoupons, bestStores, popularCategories } = await getServerSideProps(
      props.params.lang
    );

    return (
      <Layout
        alpha={props.params.lang}
        jumbotronSrc={luckyGirlImg}
        kicker="Saving your money since 2024"
        title="Alphabetical Store List"
        subtitle="In dignissim feugiat gravida. Proin feugiat quam sed gravida fringilla. Proin quis mauris ut magna fringilla vulputate quis non ante.">
        <Coupons bestCoupons={bestCoupons} bestStores={bestStores}>
          <Stores stores={stores} />
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
    bestCoupons: apis[1],
    bestStores: apis[2] as Store[],
    popularCategories: apis[3]
  };
}
