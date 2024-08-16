import ReactPaginate from 'react-paginate';

const Pagination = ({ totalCount, listSize, blockSize, currentPage, className, onChange }: PagingProps) => {
  const totalPages = listSize === 0 ? 1 : defaultToOne(Math.ceil(totalCount / listSize));
  const centerBlockCount = 3;
  const forcePage = defaultToOne(currentPage) - 1;
  return (
    <ReactPaginate
      previousLabel="‹"
      nextLabel="›"
      containerClassName={`pagination ${className}`}
      breakClassName="page-item"
      breakLabel={<span className="page-link">...</span>}
      pageClassName="page-item"
      previousClassName="page-item"
      nextClassName="page-item"
      pageLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextLinkClassName="page-link"
      activeClassName="active"
      pageRangeDisplayed={centerBlockCount}
      marginPagesDisplayed={defaultToOne(blockSize || 1 - centerBlockCount)}
      onPageChange={(item) => {
        onChange(item.selected + 1);
      }}
      pageCount={totalPages}
      forcePage={forcePage}
    />
  );
};

const defaultToOne = (value: number) => {
  return !isNaN(value) && value > 0 ? value : 1;
};

export interface PagingProps {
  totalCount: number;
  listSize: number;
  blockSize?: number;
  currentPage: number;
  className?: string;
  onChange: (pageNo: number) => void;
}

export default Pagination;
