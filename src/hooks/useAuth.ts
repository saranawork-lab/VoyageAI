import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';
import { loginUser, registerUser, verifyOtp, googleAuth } from '@/api/auth.api';
import type { LoginPayload, RegisterPayload, OtpPayload } from '@/types/user.types';
import { ROUTES } from '@/utils/constants';

export const useAuth = () => {
  const { setUser, setToken, clearAuth, user, isAuthenticated, tier, role } = useAuthStore();
  const addToast = useUIStore((s) => s.addToast);
  const navigate = useNavigate();

  const login = useCallback(async (payload: LoginPayload) => {
    try {
      const response = await loginUser(payload);
      if (response.success) {
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
      const response = await registerUser(payload);
      if (response.success) {
        setUser(response.data.user);
        setToken(response.data.tokens.accessToken);
        addToast({ type: 'success', message: 'Account created successfully!', duration: 3000 });
        navigate(ROUTES.VERIFY_OTP);
      }
    } catch {
      addToast({ type: 'error', message: 'Registration failed. Please try again.', duration: 4000 });
      throw new Error('Registration failed');
    }
  }, [setUser, setToken, addToast, navigate]);

  const verifyOTP = useCallback(async (payload: OtpPayload) => {
    try {
      const response = await verifyOtp(payload);
      if (response.success && response.data.verified) {
        addToast({ type: 'success', message: 'Phone verified!', duration: 3000 });
        navigate(ROUTES.ONBOARDING);
      }
    } catch {
      addToast({ type: 'error', message: 'Invalid OTP. Please try again.', duration: 4000 });
      throw new Error('OTP verification failed');
    }
  }, [addToast, navigate]);

  const logout = useCallback(() => {
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

  return { login, register, verifyOTP, logout, loginWithGoogle, user, isAuthenticated, tier, role };
};
