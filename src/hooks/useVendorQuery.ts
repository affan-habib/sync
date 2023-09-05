import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { Category } from "types/category";
import { apiBaseUrl } from "config";

// Define an interface for your API response
interface VendorApiResponse {
  data: any;
}

const fetchVendorData = async (): Promise<any> => {
  const response = await axios.get<VendorApiResponse>(
    `${apiBaseUrl}/list/vendors`
  );
  return response.data.data;
};

export const useVendorQuery = (): UseQueryResult<any> => {
  return useQuery("vendors", fetchVendorData);
};
