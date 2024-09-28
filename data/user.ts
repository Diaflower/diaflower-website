// src/data/user.ts
import axios from 'axios';
import { UserProfileFormData } from '@/schemas/userSchema';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const fetchUserData = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const updateUserData = async (token: string, data: UserProfileFormData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/users/me`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};