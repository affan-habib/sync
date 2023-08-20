import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { OrderDataResponse } from "types/order";
import { apiBaseUrl } from "config";


const fetchSales = async (page: number, perPage: number): Promise<OrderDataResponse> => {
  const response = await axios.get(
    `${apiBaseUrl}/orders/list?page=${page}&per_page=${perPage}`
  );
  return response.data;
};

export const useSalesQuery = (
  currentPage: number,
  rowsPerPage: number
): UseQueryResult<OrderDataResponse> => {
  return useQuery(["sales", currentPage, rowsPerPage], () =>
    fetchSales(currentPage, rowsPerPage)
  );
};
