import type { Metadata } from 'next';
import type { Category, Coupon, Store } from '@/types/api.types';

import Layout from '@/components/layout';
import { Coupons, PopularCategories, CouponList } from '@/components/UI';
import luckyGirlImg from '../../../../../public/images/excited-girl.png';
import AllStoresByCategoryList from '@/components/UI/AllStoresByCategoryList';

export default async function CategoryPage(props: any) {
  let storesByCategory: Store[] = [];

  try {
    const data = await getServerSideProps(props.params.category, props.params.lang);
    storesByCategory = data.storesByCategory || [];
  } catch (error) {
    console.error('Error fetching data:', error);
    // Optionally log error or set a fallback value
  }

  const { category } = props.params;
  const decodedCategory = decodeURIComponent(category);

  return (
    <Layout
      alpha={props.params.lang}
      jumbotronSrc={luckyGirlImg}
      kicker="Category"
      title={<span className="text-primary">Fashion</span>}
      subtitle="Get your Coupon today and save yourself up to 50% of your money">
      {storesByCategory.length > 0 ? (
        <AllStoresByCategoryList
          storeHeading={`${decodeURIComponent(category)} category`}
          storesByCategory={storesByCategory}
        />
      ) : (
        <div className="flex flex-col justify-center items-center h-[400px]">
          No stores available in the {decodedCategory} category.
        </div>
      )}
    </Layout>
  );
}

async function getServerSideProps(category: string, lang: string) {
  const categoryDecoded = decodeURIComponent(category);

  const requests = [`/stores-by-category?category=${categoryDecoded}`];

  try {
    const responses = await Promise.all(
      requests.map(async (url) => {
        const response = await fetch(`${process.env.API_URL}/${lang}${url}`, { cache: 'no-cache' });

        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}. Status: ${response.status}`);
        }

        return response.json();
      })
    );

    return {
      storesByCategory: responses[0] as Store[]
    };
  } catch (error: any) {
    console.error('Error in fetchData:', error.message);
    // Return an empty array or handle it as needed
    return { storesByCategory: [] };
  }
}

export async function generateMetadata(props: any): Promise<Metadata> {
  return {
    title: '',
    description: '',
    keywords: '',
    icons: ''
  };
}
