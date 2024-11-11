import type { FC, PropsWithChildren, ReactNode } from 'react';
import { StaticImageData } from 'next/image';

import { Header, Jumbotron } from '@/components/UI';
import Footer from '@/components/UI/Footer';

interface LayouProps {
  alpha: string;
  kicker: string;
  title: ReactNode;
  subtitle: string;
  jumbotronSrc?: StaticImageData;
}

const Layout: FC<PropsWithChildren<LayouProps>> = ({
  children,
  alpha,
  kicker,
  title,
  subtitle,
  jumbotronSrc
}) => {
  return (
    <>
      <Header alpha={alpha} jumbotronSrc={jumbotronSrc} />
      <div
        className="flex flex-col gap-y-20 justify-center items-center px-10
      ">
        {children}
      </div>
      <Footer alpha={alpha} />
    </>
  );
};

export default Layout;
