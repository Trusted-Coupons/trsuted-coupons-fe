import Layout from '@/components/layout';
import { getDictionary } from '@/translations/dictionaries';
import React from 'react';
import luckyGirlImg from '../../../../public/images/lucky-girl.png';

const About = async (props: any) => {
  const dict = await getDictionary(props.params.lang);
  return (
    <Layout
      alpha={props.params.lang}
      jumbotronSrc={luckyGirlImg}
      dict={dict}
      title={
        <>
          <span className="text-primary">20.000+</span>{' '}
          <label className="capitalize">{dict.label.coupons}</label>{' '}
          <span className="text-primary">1.000+</span>{' '}
          <label className="capitalize">{dict.navigation.stores}</label>
        </>
      }
      subtitle="Get your Coupon today and save yourself up to 50% of your money">
      <div>About</div>
    </Layout>
  );
};

export default About;
