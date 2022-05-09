import { useContext, useEffect } from "react";
import { Context } from "../context/AppContext";

const usePageSelector = (page: string) => {
  const { setCurrentPage } = useContext(Context);
  useEffect(() => {
    setCurrentPage(page);
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps
  return [];
};

export default usePageSelector;
