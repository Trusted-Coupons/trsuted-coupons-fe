import Layout from '@/components/layout';
import { PopularStores, Coupons, PopularCategories } from '@/components/UI';

import luckyGirlImg from '../../../../../public/images/excited-girl.png';

export interface Category {
  id: number;
  name: string;
}

export default async function CategoryPage(props: any) {
  try {
    const category = await getCategory(props.params.lang, props.params.category);

    return (
      <Layout
        alpha={props.params.lang}
        jumbotronSrc={luckyGirlImg}
        kicker="Category"
        title={<span className="text-primary">{category.name}</span>}
        subtitle="Get your Coupon today and save yourself up to 50% of your money">
        <PopularStores />
        <Coupons coupons={[]} />
        <PopularCategories />
      </Layout>
    );
  } catch (error) {
    return <div>Error fetching: {JSON.stringify(error)}</div>;
  }
}

async function getCategory(lang: string, category: string) {
  return { id: 'dsads', name: 'string' };

  const res = await fetch(`${process.env.API_URL}/${lang}/categories/${category}`, {
    cache: 'no-cache'
  });

  const coupons: Category = await res.json();

  if (!res.ok) {
    throw new Error('Cannot fetch repositories');
  }

  return coupons;
}
