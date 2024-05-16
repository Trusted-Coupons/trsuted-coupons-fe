import type { Metadata } from 'next';
import type { Coupon, Store } from '@/types/api.types';

import Image from 'next/image';
import Layout from '@/components/layout';
import { Coupons, PopularCategories, CouponList } from '@/components/UI';
import { getDictionary } from '@/translations/dictionaries';

export default async function StorePage(props: any) {
  try {
    const { store, coupons, bestCoupons, bestStores, popularCategories } = await getServerSideProps(
      props.params.lang,
      props.params.id,
      props.searchParams.id,
      props.searchParams.page ? props.searchParams.page : 1
    );

    const dict = await getDictionary(props.params.lang);
    return (
      <Layout
        alpha={props.params.lang}
        kicker="Saving your money since 2024"
        dict={dict}
        title={
          <>
            <span className="text-primary">20.000+</span> Coupons{' '}
            <span className="text-primary">1.000+</span> Stores
          </>
        }
        subtitle="Get your Coupon today and save yourself up to 50% of your money">
        <div className="flex flex-col items-center justify-center border-1 border-gray rounded-3xl py-8 px-8 lg:px-36 gap-y-3">
          <Image
            className="h-36 w-36 rounded-3xl mb-3"
            height={200}
            width={200}
            src={`https://logo.clearbit.com/${props.params.id}?height=200`}
            alt={'image'}
          />
          <h3 className="h3 text-xl lg:text-2xl font-semibold">{props.params.id}</h3>
          <a
            target="_blank"
            className="font-light text-primary underline text-xs lg:text-sm"
            href={`https://${props.params.id}`}>
            {props.params.id}
          </a>
          <p className="font-light text-sm lg:text-base">{store.description}</p>
        </div>
        <Coupons dict={dict} withoutHeader={true} bestCoupons={bestCoupons} bestStores={bestStores}>
          <CouponList dict={dict} coupons={coupons} id={store.id} />
        </Coupons>
        <PopularCategories categories={popularCategories} dict={dict} />
      </Layout>
    );
  } catch (error) {
    return <div>Error fetching: {JSON.stringify(error)}</div>;
  }
}

async function getServerSideProps(lang: string, store: string, storeId: number, page: number) {
  const requests = [
    `/coupons?page=${page}&perPage=10&store=${store}`,
    '/coupons?page=1&perPage=5',
    '/stores?page=1&perPage=15',
    '/categories',
    `/store/${storeId}`
  ];

  const apis = await Promise.all(
    requests?.map((url) =>
      fetch(`${process.env.API_URL}/${lang}${url}`, {
        cache: 'no-cache'
      })
    )
  ).then(async (res) => Promise.all(res?.map(async (data) => await data?.json())));

  return {
    coupons: apis[0] as Coupon[],
    bestCoupons: apis[1],
    bestStores: apis[2] as Store[],
    popularCategories: apis[3],
    store: apis[4] as Store
  };
}

export async function generateMetadata(props: any): Promise<Metadata> {
  const { store } = await getServerSideProps(
    props.params.lang,
    props.params.id,
    props.searchParams.id,
    1
  );

  return {
    title: store?.storeMetadata[0]?.metadata_title,
    description: store?.storeMetadata[0]?.metadata_title,
    keywords: store?.keywords,
    icons: store?.icon
  };
}
