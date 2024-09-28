import axios from 'axios';
import { AddressFormData } from '@/schemas/addressSchema';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const fetchAddresses = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/addresses/user`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching addresses:', error);
    throw error;
  }
};

export const createAddress = async (token: string, data: AddressFormData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addresses`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating address:', error);
    throw error;
  }
};

export const updateAddress = async (token: string, data: AddressFormData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/addresses/${data.id}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating address:', error);
    throw error;
  }
};

export const deleteAddress = async (token: string, id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/addresses/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting address:', error);
    throw error;
  }
};