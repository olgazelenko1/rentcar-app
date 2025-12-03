'use client';

import ReactPaginate from 'react-paginate';
import styles from './Pagionation.module.css';

interface Props {
  pageCount: number;
  onPageChange: (selected: number) => void;
}

export default function Pagination({ pageCount, onPageChange }: Props) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onPageChange(e.selected)}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      containerClassName={styles.pagination}
      pageClassName={styles.page}
      activeClassName={styles.active}
      previousClassName={styles.nav}
      nextClassName={styles.nav}
      breakClassName={styles.break}
    />
  );
}
