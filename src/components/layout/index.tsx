import type { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-10 max-w-[1280px] mr-auto ml-auto">{children}</div>;
};

export default Layout;
