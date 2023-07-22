export interface ProductType {
  id: number;
  vendor: string;
  isActive: boolean;
  image: null | string;
  name: string;
  category: string;
  description: string;
  currency: string;
  price: string;
  previous_price: string;
  quantity?: number;
  SKUs: string[];
  tags: string[];
  color: string;
  size: string;
  video: null | string;
  created_at: string;
  updated_at: string;
}

export type ProductFormData = {
  sku?: string[];
  tags?: string[];
  skuArray?: {
    value: string;
  }[];
  tagsArray?: {
    value: string;
  }[];
  productName: string;
  productType: string;
  productBrand: string;
  productCategory: string;
  description: string;
  shortDescription: string;
  currency: string;
  price: string;
  discountedPrice: string;
  color: string;
  size: string;
  stockQuantity: number;
  isNew: boolean;
  isTrending: boolean;
  images: File[];
  videos: File[];
  source: string;
  sourceLink: string;
  review: string;
};
