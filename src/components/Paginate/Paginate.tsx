import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

type PaginateType = {
  currentPage?: string;
  lastPage: number;
  setPage: any;
};

const Paginate: React.FC<PaginateType> = ({
  currentPage = "0",
  lastPage,
  setPage,
}) => {
  const [initialPage, setInitialPage] = useState<number>(0);

  useEffect(() => {
    setInitialPage(parseInt(currentPage) - 1);
  }, [currentPage]);

  return (
    <ReactPaginate
      initialPage={initialPage}
      pageCount={lastPage}
      onPageChange={(page) => setPage(page.selected + 1)}
      breakLabel={"..."}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      previousClassName="hidden"
      nextClassName="hidden"
      breakClassName="breakClassName"
      pageLinkClassName="pageLinkClassName"
      containerClassName="containerClassName"
      activeLinkClassName="activeLinkClassName"
    />
  );
};

export default Paginate;
