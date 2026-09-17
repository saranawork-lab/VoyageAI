// Typed environment variable exports with runtime validation
// In React Native port, replace import.meta.env with react-native-config

const getEnvVar = (key: string, required = true): string => {
  const value = import.meta.env[key] as string | undefined;
  if (required && !value) {
    throw new Error(
      `Missing required environment variable: ${key}. Check your .env file.`
    );
  }
  return value ?? '';
};

export const ENV = {
  API_BASE_URL: getEnvVar('VITE_API_BASE_URL'),
  GOOGLE_CLIENT_ID: getEnvVar('VITE_GOOGLE_CLIENT_ID', false),
  RAZORPAY_KEY_ID: getEnvVar('VITE_RAZORPAY_KEY_ID', false),
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;
