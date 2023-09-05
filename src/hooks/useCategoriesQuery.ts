import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { Category } from "types/category";
import { apiBaseUrl } from "config";

// Define an interface for your API response
interface CategoryApiResponse {
  data: Category[];
}

const fetchCategoryData = async (): Promise<Category[]> => {
  const response = await axios.get<CategoryApiResponse>(`https://apps.syyn.shop/api/categories/list`);
  return response.data.data;
};

export const useCategoryQuery = (): UseQueryResult<Category[]> => {
  return useQuery("categories", fetchCategoryData);
};
