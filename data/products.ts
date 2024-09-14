import axios from 'axios';
import { Product } from '@/types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await api.get<Product>(`/products/getBySlug/${slug}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching product:', error.message);
      console.error('Error details:', error.response?.data);
    } else {
      console.error('Unknown error fetching product:', error);
    }
    return null;
  }
}

export async function getAllProductSlugs(): Promise<string[]> {
  try {
    const response = await api.get<string[]>('/products/getproductsSlugs');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching product slugs:', error.message);
      console.error('Error details:', error.response?.data);
    } else {
      console.error('Unknown error fetching product slugs:', error);
    }
    return [];
  }
}