import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';
import { loginUser, registerUser, verifyOtp, googleAuth, setAuthToken } from '@/api/auth.api';
import type { LoginPayload, RegisterPayload, OtpPayload } from '@/types/user.types';
import { ROUTES } from '@/utils/constants';

export const useAuth = () => {
  const { setUser, setToken, clearAuth, user, isAuthenticated, tier, role, pendingUserId, setPendingUserId } = useAuthStore();
  const addToast = useUIStore((s) => s.addToast);
  const navigate = useNavigate();

  const login = useCallback(async (payload: LoginPayload) => {
    try {
      const response = await loginUser(payload);
      if (response.success) {
        setAuthToken(response.data.tokens.accessToken);
        setUser(response.data.user);
        setToken(response.data.tokens.accessToken);
        addToast({ type: 'success', message: 'Welcome back!', duration: 3000 });
        navigate(ROUTES.DASHBOARD);
      }
    } catch {
      addToast({ type: 'error', message: 'Invalid credentials. Please try again.', duration: 4000 });
      throw new Error('Login failed');
    }
  }, [setUser, setToken, addToast, navigate]);

  const register = useCallback(async (payload: RegisterPayload) => {
    try {
      // Backend returns a { userId, message }
      const response = await registerUser(payload) as any;
      if (response.success) {
        setPendingUserId(response.data.userId);
        addToast({ type: 'success', message: 'Account created! Please verify your OTP.', duration: 3000 });
        navigate(ROUTES.VERIFY_OTP);
      }
    } catch {
      addToast({ type: 'error', message: 'Registration failed. Please try again.', duration: 4000 });
      throw new Error('Registration failed');
    }
  }, [setPendingUserId, addToast, navigate]);

  const verifyOTP = useCallback(async (otp: string) => {
    try {
      if (!pendingUserId) throw new Error('No pending registration found');
      
      const payload: OtpPayload = { userId: pendingUserId, otp };
      const response = await verifyOtp(payload);
      
      if (response.success) {
        setAuthToken(response.data.tokens.accessToken);
        setUser(response.data.user);
        setToken(response.data.tokens.accessToken);
        setPendingUserId(null);
        addToast({ type: 'success', message: 'Phone verified!', duration: 3000 });
        navigate(ROUTES.ONBOARDING);
      }
    } catch {
      addToast({ type: 'error', message: 'Invalid OTP. Please try again.', duration: 4000 });
      throw new Error('OTP verification failed');
    }
  }, [pendingUserId, setUser, setToken, setPendingUserId, addToast, navigate]);

  const handleResendOTP = useCallback(async () => {
    try {
      if (!pendingUserId) throw new Error('No pending registration found');
      // Using the import we'll add
      const { resendOtp: resendOtpApi } = await import('@/api/auth.api');
      const response = await resendOtpApi(pendingUserId);
      if (response.success) {
        addToast({ type: 'success', message: 'OTP sent successfully!', duration: 3000 });
      }
    } catch (error: any) {
       // Extract the actual API error message if available
       const errorMsg = error.response?.data?.detail || 'Failed to resend OTP. Please try again.';
       addToast({ type: 'error', message: errorMsg, duration: 4000 });
       throw error;
    }
  }, [pendingUserId, addToast]);

  const logout = useCallback(() => {
    setAuthToken(null);
    clearAuth();
    navigate(ROUTES.LOGIN);
    addToast({ type: 'info', message: 'You have been logged out.', duration: 3000 });
  }, [clearAuth, navigate, addToast]);

  const loginWithGoogle = useCallback(async () => {
    try {
      const response = await googleAuth();
      if (response.success) {
        setUser(response.data.user);
        setToken(response.data.tokens.accessToken);
        addToast({ type: 'success', message: 'Welcome back!', duration: 3000 });
        navigate(ROUTES.DASHBOARD);
      }
    } catch {
      addToast({ type: 'error', message: 'Google Sign-in failed. Please try again.', duration: 4000 });
      throw new Error('Google Sign-in failed');
    }
  }, [setUser, setToken, addToast, navigate]);

  return { login, register, verifyOTP, resendOTP: handleResendOTP, logout, loginWithGoogle, user, isAuthenticated, tier, role };
};
