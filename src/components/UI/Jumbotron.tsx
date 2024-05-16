import type { FC, ReactNode } from 'react';
import Link from 'next/link';

interface JumbotronProps {
  kicker?: string;
  title: ReactNode;
  subtitle: string;
}

const Jumbotron: FC<JumbotronProps> = ({ title, subtitle }) => {
  return (
    <div className="absolute w-full transform -translate-y-1/2 top-1/2">
      <div className="mx-auto flex flex-col gap-y-1 text-white max-w-7xl p-2 lg:p-6 lg:gap-y-3 lg:px-8">
        <h1 className="h1 font-medium invisible text-lg md:w-[25rem] sm:visible md:text-4xl lg:w-[35rem] lg:text-6xl">
          {title}
        </h1>
        <h2 className="h2 opacity-70 sm:ml-0 text-sm w-[15rem] md:w-[35rem] md:text-xl lg:text-2xl">
          {subtitle}
        </h2>
      </div>
    </div>
  );
};

export default Jumbotron;
