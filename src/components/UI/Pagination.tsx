import type { FC } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

interface PaginationProps {}

const Pagination: FC<PaginationProps> = () => {
  const pathname = usePathname();
  const router = useRouter();
  const page = Number(useSearchParams().get('page') ?? 1);

  const togglePage = (page: number) => {
    router.push(`${pathname}?page=${page}`);
  };

  function generatePagination(currentPage: number, totalPages: number) {
    let pagination = [];

    let start = currentPage <= 3 ? 1 : currentPage - 2;
    let end = Math.min(start + 4, totalPages);

    for (let i = start; i <= end; i++) {
      pagination.push(i);
    }

    while (pagination.length < 5 && start > 1) {
      pagination.unshift(start - 1);
      start--;
    }

    return pagination;
  }

  return (
    <div className="flex justify-center pt-8 pb-4 gap-x-2 hover:cursor-pointer">
      <span
        className={`border-1 border-gray rounded-full p-4 ${page == 1 && 'bg-neutral-50'}`}
        onClick={() => togglePage(page - 1)}>
        {'<'}
      </span>
      {generatePagination(page, 50).map((pg) => (
        <span
          key={pg}
          className={`border-1 border-gray rounded-full p-4 ${pg == page && 'border-primary'}`}
          onClick={() => togglePage(pg)}>
          {pg}
        </span>
      ))}
      <span className="border-1 border-gray rounded-full p-4" onClick={() => togglePage(page + 1)}>
        {'>'}
      </span>
    </div>
  );
};

export default Pagination;
