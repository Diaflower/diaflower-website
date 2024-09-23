import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface CreateOrderDTO {
  userId?: string;
  items: OrderItemInput[];
  shippingAddressId?: number;
  paymentMethod: 'ONLINE' | 'CASH_ON_DELIVERY' | undefined;
  shippingAddress?: AddressInput;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  isAnonymous: boolean;
  cardMessage?: string;
  couponCode?: string;
}

export interface OrderItemInput {
  productId: number;
  productVariationId: number;
  quantity: number;
  addons?: {
    addonId: number;
    addonVariationId: number;
    quantity: number;
  }[];
}

export interface AddressInput {
  addressTitle?: string;
  title?: 'MR' | 'MS' | 'MRS';
  firstName: string;
  lastName?: string;
  addressLine1: string;
  country: string;
  state: string;
  area?: string;
  postalCode?: string;
  phone: string;
}

export const createOrder = async (orderData: CreateOrderDTO, token?: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders/create`, orderData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};


export const updateOrderStatus = async (paymentIntentId: string) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/orders/update-status`, { paymentIntentId });
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};


export const fetchOrders = async (token: string, page: number = 1, pageSize: number = 10, lang: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/customer`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        page,
        pageSize,
        lang
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};


export const fetchOrderById = async (token: string, orderId: string, lang: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/customer/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        lang
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

export const cancelOrder = async (token: string, orderId: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders/${orderId}/cancel`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error cancelling order:', error);
    throw error;
  }
};