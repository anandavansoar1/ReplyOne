import { Platform } from 'react-native';
import { useAuthStore } from '@/store/use-auth-store';

// Use localhost for iOS simulator, 10.0.2.2 for Android emulator,
// or replace with your local IP address for a physical device (e.g., '192.168.1.100')
const HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const PORT = 5001;

export const BASE_URL = `http://${HOST}:${PORT}/api`;

interface ApiOptions extends RequestInit {
  data?: any;
  token?: string | null;
}

/**
 * Generic API fetch utility
 */
export const apiFetch = async <T>(endpoint: string, options: ApiOptions = {}): Promise<T> => {
  const { data, token, headers: customHeaders, ...customOptions } = options;

  const url = `${BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...customHeaders,
  };

  // If a token is provided in the options, use it. Otherwise, try to get it from the store.
  const authToken = token || useAuthStore.getState().token;
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const config: RequestInit = {
    ...customOptions,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);
    
    // Parse response body
    let responseData;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (!response.ok) {
      if (response.status === 401) {
        // Token is expired or invalid
        useAuthStore.getState().logout();
      }
      
      const errorMessage = responseData?.message || responseData || `API Error: ${response.status}`;
      throw new Error(errorMessage);
    }

    return responseData as T;
  } catch (error: any) {
    // Check if it's a network error (server unreachable, wrong IP, etc.)
    if (error.message === 'Network request failed' || error.message.includes('Network request failed')) {
      console.error(`API Fetch Error [${endpoint}]: Network request failed. Make sure your backend is running on ${BASE_URL} and the IP address is correct if using a physical device.`);
      throw new Error('Server unreachable. Please check your connection and ensure the backend is running.');
    }
    
    console.error(`API Fetch Error [${endpoint}]:`, error.message);
    throw error;
  }
};
