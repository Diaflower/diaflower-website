import axios from 'axios';
import { Product, SimpleProduct } from '@/types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export interface ProductsResponse {
  items: SimpleProduct[];
  totalCount: number;
}

export const getProductBySlug = async (slug: string, lang: 'en' | 'ar' = 'en'): Promise<Product | null> => {
  try {
    const response = await axios.get<Product>(`${API_BASE_URL}/products/getBySlug/${slug}`, {
      params: { lang }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data);
    }
    return null;
  }
};

export const getAllProductSlugs = async (): Promise<string[]> => {
  try {
    const response = await axios.get<string[]>(`${API_BASE_URL}/products/getproductsSlugs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all product slugs:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data);
    }
    return [];
  }
};

export const getProductsByTag = async (tagName: string, lang: 'en' | 'ar' = 'en'): Promise<ProductsResponse> => {
  try {
    const response = await axios.get<ProductsResponse>(`${API_BASE_URL}/products/getByTag`, {
      params: { tagName, lang }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products by tag:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data);
    }
    throw error;
  }
};