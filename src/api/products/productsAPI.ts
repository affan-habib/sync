import axios from "axios";
import { apiBaseUrl } from "../../config";
import { ProductFormData, ProductType } from "../../types";

interface MetaData {
  current_page: number;
  from: number;
  last_page: number;
  links: { url: string; label: string; active: boolean }[];
  per_page: number;
  to: number;
  total: number;
}

interface Links {
  first: string;
  last: string;
  prev: string;
  next: string;
}

interface ProductsResponse {
  data: ProductType[];
  meta: MetaData;
  links: Links;
}

export const fetchProducts = async (
  page: number,
  rowsPerPage: number,
  searchTerm: string
): Promise<ProductsResponse> => {
  const response = await axios.get<ProductsResponse>(
    `${apiBaseUrl}/products?page=${page}&perPage=${rowsPerPage}&search=${encodeURIComponent(
      searchTerm
    )}`
  );
  return response.data;
};

export const createProduct = async (data: ProductFormData) => {
  console.log("createProduct", data);
  // simulate creating a product
  return {
    id: "130",
  };
};

export const presign = async (
  productId: number | string,
  fileName: string,
  fileType: string,
  fileSize: number,
  mediaType: "image" | "video"
) => {
  const response = await axios.post(
    `${apiBaseUrl}/products/${productId}/presign`,
    {
      fileName,
      fileType,
      fileSize,
      mediaType,
    }
  );

  return response.data;
};

export const uploadPresignedFile = async (presignedUrl: string, file: File) => {
  if (!presignedUrl || !file) {
    throw new Error("Missing presignedUrl or file");
  }

  const response = await axios.put(presignedUrl, file, {
    headers: {
      "Content-Type": file.type,
      "Content-Length": file.size,
    },
  });

  if (response.status !== 200) {
    throw new Error(`Failed to upload file ${file.name}`);
  }

  return response.data;
};

export const saveMedia = async (
  productId: number | string,
  mediaType: "image" | "video",
  presignedUrl: string,
  file: File
) => {
  const response = await axios.post(
    `${apiBaseUrl}/products/${productId}/save-${mediaType}`,
    {
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      s3Url: presignedUrl.split("?")[0],
    }
  );

  return response.data;
};

export const importCsv = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.post(
    `${apiBaseUrl}/products/import-from-csv`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
