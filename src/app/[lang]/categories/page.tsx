import type { Category, Store } from '@/types/api.types';
import Layout from '@/components/layout';
import { Categories, Coupons, PopularCategories, Stores } from '@/components/UI';
import luckyGirlImg from '../../../../public/images/excited-girl.png';
import { getDictionary } from '@/translations/dictionaries';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trusted Coupons',
  description: 'Lorem Ipsum is Lorem Ipsum',
  keywords: 'Trusted, Coupons'
};

export default async function CategoriesPage(props: any) {
  try {
    const { alphabetCategories, bestCoupons, bestStores, popularCategories } =
      await getServerSideProps(props.params.lang);
    const dict = await getDictionary(props.params.lang);
    return (
      <Layout
        alpha={props.params.lang}
        jumbotronSrc={luckyGirlImg}
        title={dict.heading.hero_heading_categories}
        dict={dict}
        subtitle={dict.heading.hero_subheading_categories}>
        <Coupons withoutHeader={true} bestCoupons={bestCoupons} bestStores={bestStores} dict={dict}>
          <Categories alphabetCategories={alphabetCategories} dict={dict} />
        </Coupons>
        <PopularCategories categories={popularCategories} dict={dict} />
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
    '/categories'
  ];

  const apis = await Promise.all(
    requests?.map((url) =>
      fetch(`${process.env.API_URL}/${lang}${url}`, {
        cache: 'no-cache'
      })
    )
  ).then(async (res) => Promise.all(res?.map(async (data) => await data.json())));

  return {
    alphabetCategories: apis[0] as Record<string, Category[]>,
    bestCoupons: apis[1],
    bestStores: apis[2] as Store[],
    popularCategories: apis[3]
  };
}
