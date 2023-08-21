import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { OrderDataResponse } from "types/order";
import { apiBaseUrl } from "config";

const fetchSales = async (
  page: number,
  perPage: number,
  search: string
): Promise<OrderDataResponse> => {
  const response = await axios.get(
    `${apiBaseUrl}/orders/list?page=${page}&perPage=${perPage}&search=${search}`
  );
  return response.data;
};

export const useOrdersQuery = (
  currentPage: number,
  rowsPerPage: number,
  search: string
): UseQueryResult<OrderDataResponse> => {
  return useQuery(["sales", currentPage, rowsPerPage, search], () =>
    fetchSales(currentPage, rowsPerPage, search)
  );
};
