import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { Category } from "types/category";
import { apiBaseUrl } from "config";

// Define an interface for your API response
interface PrerentProductApiResponse {
  data: any;
}

const fetchVendorData = async (): Promise<any> => {
  const response = await axios.get<PrerentProductApiResponse>(
    `${apiBaseUrl}/list/parent-products`
  );
  return response.data.data;
};

export const useParentProductsQuery = (): UseQueryResult<any> => {
  return useQuery("parentProduct", fetchVendorData);
};
