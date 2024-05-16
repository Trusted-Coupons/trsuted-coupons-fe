import type { Metadata } from 'next';
import type { Store } from '@/types/api.types';
import Layout from '@/components/layout';
import { Coupons, PopularCategories, CouponList } from '@/components/UI';
import luckyGirlImg from '../../../../../public/images/excited-girl.png';
import { getDictionary } from '@/translations/dictionaries';
import { CategoriesLangKeys } from '@/types/categoriesLangKeys';

export default async function CategoryPage(props: any) {
  try {
    const { coupons, bestCoupons, bestStores, popularCategories } = await getServerSideProps(
      props.params.lang,
      props.params.id
    );
    const dict = await getDictionary(props.params.lang);

    const returnCategorieKey = (catId: number) => {
      const result = CategoriesLangKeys.find((categorie) => categorie.id === catId);
      if (result) {
        return dict.category[result.categorieKey];
      } else {
        return '';
      }
    };

    return (
      <Layout
        alpha={props.params.lang}
        jumbotronSrc={luckyGirlImg}
        title={<span className="text-primary">{returnCategorieKey(Number(props.params.id))}</span>}
        dict={dict}
        subtitle={dict.heading.hero_subheading_categories}>
        <Coupons dict={dict} withoutHeader={true} bestCoupons={bestCoupons} bestStores={bestStores}>
          <CouponList dict={dict} coupons={coupons} />
        </Coupons>
        <PopularCategories categories={popularCategories} dict={dict} />
      </Layout>
    );
  } catch (error) {
    return <div>Error fetching: {JSON.stringify(error)}</div>;
  }
}

async function getServerSideProps(lang: string, id?: any) {
  const requests = [
    '/stores?page=1&perPage=50',
    `/coupons/categories/${id}?page=1`,
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
    stores: apis[0] as Store[],
    coupons: apis[1],
    bestCoupons: apis[2],
    bestStores: apis[3] as Store[],
    popularCategories: apis[4]
  };
}

// export async function generateMetadata(props: any): Promise<Metadata> {
//   const { stores } = await getServerSideProps(props.params.lang);
//   // videti sa igorom sta da radimo za metadatu za categorije
//   return {
//     title: stores[0]?.store,
//     description: stores[0]?.description,
//     keywords: stores[0]?.keywords,
//     icons: stores[0]?.icon
//   };
// }
