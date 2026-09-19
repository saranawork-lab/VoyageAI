import axios from 'axios';
import type { ApiResponse } from '@/types/api.types';
import type {
  UserProfile,
  LoginPayload,
  RegisterPayload,
  OtpPayload,
  AuthTokens,
  ResetPasswordPayload,
} from '@/types/user.types';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const apiClient = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to set auth token
export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// ── API Functions ──────────────────────────────────────────

export const loginUser = async (
  payload: LoginPayload
): Promise<ApiResponse<{ user: UserProfile; tokens: AuthTokens }>> => {
  try {
    // Note: The backend expects 'phone' and 'password'
    const response = await apiClient.post('/auth/login', {
      phone: payload.emailOrPhone,
      password: payload.password
    });
    const data = response.data;
    
    return {
      success: true,
      data: {
        user: data.user,
        tokens: { accessToken: data.accessToken, refreshToken: data.accessToken } // The backend returns just accessToken for now
      }
    };
  } catch (error: any) {
    console.error('Login Error:', error);
    throw error;
  }
};

export const registerUser = async (
  payload: RegisterPayload
): Promise<ApiResponse<{ userId: string; message: string }>> => {
  try {
    const response = await apiClient.post('/auth/register', payload);
    return {
      success: true,
      data: response.data // Should contain { userId, message }
    };
  } catch (error: any) {
    console.error('Register Error:', error);
    throw error;
  }
};

export const verifyOtp = async (
  payload: OtpPayload
): Promise<ApiResponse<{ user: UserProfile; tokens: AuthTokens }>> => {
  try {
    const response = await apiClient.post('/auth/verify-otp', payload);
    const data = response.data;
    return { 
      success: true, 
      data: {
        user: data.user,
        tokens: { accessToken: data.accessToken, refreshToken: data.accessToken }
      } 
    };
  } catch (error: any) {
    console.error('Verify OTP Error:', error);
    throw error;
  }
};

export const resendOtp = async (
  userId: string
): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await apiClient.post('/auth/resend-otp', { userId });
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Resend OTP Error:', error);
    throw error;
  }
};

export const getMe = async (): Promise<ApiResponse<UserProfile>> => {
  try {
    const response = await apiClient.get('/auth/me');
    return { success: true, data: response.data };
  } catch (error: any) {
    throw error;
  }
};

export const refreshToken = async (): Promise<ApiResponse<{ accessToken: string }>> => {
  // Stub for token refresh if you implement it on the backend
  throw new Error('Not implemented');
};

export const logoutUser = async (): Promise<ApiResponse<{ success: boolean }>> => {
  try {
    // We can clear token client side, or call a backend logout route if it exists
    setAuthToken(null);
    return { success: true, data: { success: true } };
  } catch (error: any) {
    throw error;
  }
};

export const forgotPassword = async (
  email: string
): Promise<ApiResponse<{ sent: boolean }>> => {
  // Stub - needs backend implementation
  return { success: true, data: { sent: true } };
};

export const resetPassword = async (
  payload: ResetPasswordPayload
): Promise<ApiResponse<{ reset: boolean }>> => {
  // Stub - needs backend implementation
  return { success: true, data: { reset: true } };
};

export const googleAuth = async (): Promise<ApiResponse<{ user: UserProfile; tokens: AuthTokens }>> => {
  // Stub - You can implement a backend endpoint to handle Google OAuth tokens
  throw new Error('Google Auth not migrated to backend yet');
};
