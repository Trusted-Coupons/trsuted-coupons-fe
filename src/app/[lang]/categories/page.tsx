import type { Metadata } from 'next';
import type { Category, Store } from '@/types/api.types';

import Layout from '@/components/layout';
import { Categories, Coupons, PopularCategories, Stores } from '@/components/UI';

import luckyGirlImg from '../../../../public/images/excited-girl.png';

export const metadata: Metadata = {
  title: 'Trusted Coupons',
  description: 'Lorem Ipsum is Lorem Ipsum',
  keywords: 'Trusted, Coupons'
};

export default async function CategoriesPage(props: any) {
  try {
    const { alphabetCategories, bestCoupons, bestStores, popularCategories } =
      await getServerSideProps(props.params.lang);

    return (
      <Layout
        alpha={props.params.lang}
        jumbotronSrc={luckyGirlImg}
        kicker="Saving your money since 2024"
        title="Alphabetical Category List"
        subtitle="In dignissim feugiat gravida. Proin feugiat quam sed gravida fringilla. Proin quis mauris ut magna fringilla vulputate quis non ante.">
        <Coupons withoutHeader={true} bestCoupons={bestCoupons} bestStores={bestStores}>
          <Categories alphabetCategories={alphabetCategories} />
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
    '/categories-all',
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
    alphabetCategories: apis[0] as Record<string, Category[]>,
    bestCoupons: apis[1],
    bestStores: apis[2] as Store[],
    popularCategories: apis[3]
  };
}
