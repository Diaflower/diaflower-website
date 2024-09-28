import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export interface ValidateCouponDTO {
  code: string;
  subtotal: number;
}

export interface ValidateCouponResponse {
  isValid: boolean;
  discountAmount: number;
  message: string;
}

export const validateCoupon = async (couponData: ValidateCouponDTO): Promise<ValidateCouponResponse> => {
  try {
    const response = await axios.post<ValidateCouponResponse>(`${API_BASE_URL}/coupons/validate`, couponData);
    return response.data;
  } catch (error) {
    console.error('Error validating coupon:', error);
    throw error;
  }
};