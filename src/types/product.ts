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