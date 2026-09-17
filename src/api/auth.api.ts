import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { ApiResponse } from '@/types/api.types';
import type {
  UserProfile,
  LoginPayload,
  RegisterPayload,
  OtpPayload,
  AuthTokens,
  ResetPasswordPayload,
} from '@/types/user.types';

// Helper to fetch user document from Firestore
const fetchUserProfile = async (uid: string): Promise<UserProfile> => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (!userDoc.exists()) {
    throw new Error('User profile not found in database.');
  }
  return { id: userDoc.id, ...userDoc.data() } as UserProfile;
};

// ── API Functions ──────────────────────────────────────────

export const loginUser = async (
  payload: LoginPayload
): Promise<ApiResponse<{ user: UserProfile; tokens: AuthTokens }>> => {
  try {
    // Note: Firebase Auth expects email, but payload has emailOrPhone.
    // For this implementation, we assume it's an email address.
    const userCredential = await signInWithEmailAndPassword(auth, payload.emailOrPhone, payload.password);
    const token = await userCredential.user.getIdToken();
    
    const userProfile = await fetchUserProfile(userCredential.user.uid);
    
    return {
      success: true,
      data: {
        user: userProfile,
        tokens: { accessToken: token, refreshToken: userCredential.user.refreshToken }
      }
    };
  } catch (error: any) {
    console.error('Login Error:', error);
    throw error;
  }
};

export const registerUser = async (
  payload: RegisterPayload
): Promise<ApiResponse<{ user: UserProfile; tokens: AuthTokens }>> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
    const uid = userCredential.user.uid;
    const token = await userCredential.user.getIdToken();

    // Create the Firestore document
    const newUserProfile: Omit<UserProfile, 'id'> = {
      name: payload.name,
      email: payload.email,
      phone: payload.phone || '',
      role: payload.role,
      tier: 'free',
      avatarUrl: null,
      location: '',
      language: ['English'],
      isOnboarded: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(doc(db, 'users', uid), {
      ...newUserProfile,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      data: {
        user: { id: uid, ...newUserProfile },
        tokens: { accessToken: token, refreshToken: userCredential.user.refreshToken }
      }
    };
  } catch (error: any) {
    console.error('Register Error:', error);
    throw error;
  }
};

export const verifyOtp = async (
  payload: OtpPayload
): Promise<ApiResponse<{ verified: boolean }>> => {
  // Mocked: Phone Auth OTP verification typically requires Firebase PhoneAuthProvider
  // and a recaptcha verifier. For now, this remains a stub.
  if (payload.otp === '123456' || payload.otp.length === 6) {
    return { success: true, data: { verified: true } };
  }
  throw new Error('Invalid OTP');
};

export const getMe = async (): Promise<ApiResponse<UserProfile>> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('Not authenticated');
    
    const userProfile = await fetchUserProfile(currentUser.uid);
    return { success: true, data: userProfile };
  } catch (error: any) {
    throw error;
  }
};

export const refreshToken = async (): Promise<ApiResponse<{ accessToken: string }>> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('Not authenticated');
    
    const token = await currentUser.getIdToken(true);
    return { success: true, data: { accessToken: token } };
  } catch (error: any) {
    throw error;
  }
};

export const logoutUser = async (): Promise<ApiResponse<{ success: boolean }>> => {
  try {
    await signOut(auth);
    // Explicitly cast the returned data so TS knows it has the success property.
    return { success: true, data: { success: true } } as ApiResponse<{ success: boolean }>;
  } catch (error: any) {
    throw error;
  }
};

export const forgotPassword = async (
  email: string
): Promise<ApiResponse<{ sent: boolean }>> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, data: { sent: true } };
  } catch (error: any) {
    throw error;
  }
};

export const resetPassword = async (
  payload: ResetPasswordPayload
): Promise<ApiResponse<{ reset: boolean }>> => {
  // Custom reset password handling typically uses confirmPasswordReset
  // This is a stub for the custom flow if required
  return { success: true, data: { reset: true } };
};

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const googleAuth = async (): Promise<ApiResponse<{ user: UserProfile; tokens: AuthTokens }>> => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const token = await userCredential.user.getIdToken();
    const uid = userCredential.user.uid;

    let userProfile: UserProfile;
    try {
      // Check if user exists in Firestore
      userProfile = await fetchUserProfile(uid);
    } catch (e) {
      // If not, this is their first time logging in with Google, create the profile
      const newUserProfile: Omit<UserProfile, 'id'> = {
        name: userCredential.user.displayName || 'Google User',
        email: userCredential.user.email || '',
        phone: userCredential.user.phoneNumber || '',
        role: 'student', // Default role for OAuth users
        tier: 'free',
        avatarUrl: userCredential.user.photoURL || null,
        location: '',
        language: ['English'],
        isOnboarded: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await setDoc(doc(db, 'users', uid), {
        ...newUserProfile,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      userProfile = { id: uid, ...newUserProfile };
    }

    return {
      success: true,
      data: {
        user: userProfile,
        tokens: { accessToken: token, refreshToken: userCredential.user.refreshToken }
      }
    };
  } catch (error: any) {
    console.error('Google Auth Error:', error);
    throw error;
  }
};
