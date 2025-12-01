'use client';

import ReactPaginate from 'react-paginate';
import css from './Pagionation.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({
  totalPages,
  currentPage,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = ({ selected }: { selected: number }) => {
    const nextPage = selected + 1;
    const params = new URLSearchParams(
      searchParams ? Array.from(searchParams.entries()) : []
    );
    params.set('page', String(nextPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <ReactPaginate
      pageCount={Math.max(1, totalPages)}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={handlePageChange}
      forcePage={Math.max(0, Math.min(totalPages - 1, currentPage - 1))}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
      breakLabel="…"
    />
  );
}
