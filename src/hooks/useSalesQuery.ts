import { useQuery } from "react-query";
import axios from "axios";

const fetchSales = async (page: number, perPage: number) => {
  const response = await axios.get(
    `https://apps.syyn.shop/api/admin/orders/list?page=${page}&per_page=${perPage}`
  );
  return response.data.data;
};

export const useSalesQuery = (currentPage: number, rowsPerPage: number) => {
  return useQuery(["sales", currentPage, rowsPerPage], () =>
    fetchSales(currentPage, rowsPerPage)
  );
};
