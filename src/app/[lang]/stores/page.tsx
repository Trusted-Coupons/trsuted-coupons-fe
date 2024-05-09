import type { Metadata } from 'next';

import Layout from '@/components/layout';
import { Stores, Coupons, PopularCategories } from '@/components/UI';
import type { Store } from '@/types/api.types';

import luckyGirlImg from '../../../../public/images/confident-girl.png';

export const metadata: Metadata = {
  title: 'Alphabetical Store List',
  description:
    'In dignissim feugiat gravida. Proin feugiat quam sed gravida fringilla. Proin quis mauris ut magna fringilla vulputate quis non ante.',
  keywords: 'Trusted, Coupons'
};

export default async function StoresPage(props: any) {
  try {
    const { alphabetStores, bestCoupons, bestStores, popularCategories } = await getServerSideProps(
      props.params.lang
    );

    return (
      <Layout
        alpha={props.params.lang}
        jumbotronSrc={luckyGirlImg}
        kicker="Saving your money since 2024"
        title="Alphabetical Store List"
        subtitle="In dignissim feugiat gravida. Proin feugiat quam sed gravida fringilla. Proin quis mauris ut magna fringilla vulputate quis non ante.">
        <Coupons withoutHeader={true} bestCoupons={bestCoupons} bestStores={bestStores}>
          <Stores alphabetStores={alphabetStores} />
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
    '/stores-all',
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
    alphabetStores: apis[0] as Record<string, Store[]>,
    bestCoupons: apis[1],
    bestStores: apis[2] as Store[],
    popularCategories: apis[3]
  };
}
