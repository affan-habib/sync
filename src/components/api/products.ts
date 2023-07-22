import axios from "axios";
import { apiBaseUrl } from "../../config";
import { ProductFormData } from "../../types";

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
  fileUrl: string,
  fileName: string,
  fileType: string,
  fileSize: number
) => {
  const response = await axios.post(
    `${apiBaseUrl}/products/${productId}/save-${mediaType}`,
    {
      mediaType,
      fileUrl,
      fileName,
      fileType,
      fileSize,
    }
  );

  return response.data;
};
