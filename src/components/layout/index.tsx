import type { FC, PropsWithChildren, ReactNode } from 'react';
import { StaticImageData } from 'next/image';

import { Header, Jumbotron } from '@/components/UI';
import Footer from '@/components/UI/Footer';

interface LayouProps {
  alpha: string;
  kicker?: string;
  title: ReactNode;
  subtitle: string;
  jumbotronSrc?: StaticImageData;
  dict: any;
}

const Layout: FC<PropsWithChildren<LayouProps>> = ({
  children,
  alpha,
  kicker,
  title,
  subtitle,
  jumbotronSrc,
  dict
}) => {
  return (
    <>
      <Header alpha={alpha} jumbotronSrc={jumbotronSrc} dict={dict}>
        {jumbotronSrc && <Jumbotron title={title} subtitle={subtitle} />}
      </Header>
      <div className="flex flex-col gap-y-10 max-w-[1280px] mr-auto ml-auto p-4">{children}</div>
      <Footer alpha={alpha} dict={dict} />
    </>
  );
};

export default Layout;
