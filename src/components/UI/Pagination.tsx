import type { FC } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

interface PaginationProps {}

const Pagination: FC<PaginationProps> = () => {
  const pathname = usePathname();
  const router = useRouter();
  const page = useSearchParams().get('page') ?? '1';

  const togglePage = (direction: number) => {
    router.push(`${pathname}?page=${Number(page) + direction}`);
  };

  return (
    <div className="flex justify-center pt-8 pb-4 gap-x-2 hover:cursor-pointer">
      <span className="border-1 border-gray rounded-full p-4" onClick={() => togglePage(-1)}>
        {'<'}
      </span>
      <span className="border-1 border-gray rounded-full p-4">1</span>
      <span className="border-1 border-gray rounded-full p-4">2</span>
      <span className="border-1 border-gray rounded-full p-4">3</span>
      <span className="border-1 border-gray rounded-full p-4">4</span>
      <span className="border-1 border-gray rounded-full p-4" onClick={() => togglePage(1)}>
        {'>'}
      </span>
    </div>
  );
};

export default Pagination;
