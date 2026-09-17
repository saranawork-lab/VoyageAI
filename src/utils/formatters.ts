import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns';

// ── Date Formatting (uses date-fns only, no browser APIs) ──

export const formatDate = (dateStr: string): string => {
  const date = parseISO(dateStr);
  if (!isValid(date)) return 'Invalid date';
  return format(date, 'MMM d, yyyy');
};

export const formatDateTime = (dateStr: string): string => {
  const date = parseISO(dateStr);
  if (!isValid(date)) return 'Invalid date';
  return format(date, 'MMM d, yyyy h:mm a');
};

export const formatRelative = (dateStr: string): string => {
  const date = parseISO(dateStr);
  if (!isValid(date)) return 'Invalid date';
  return formatDistanceToNow(date, { addSuffix: true });
};

export const formatMonthYear = (dateStr: string): string => {
  const date = parseISO(dateStr);
  if (!isValid(date)) return 'Invalid date';
  return format(date, 'MMMM yyyy');
};

// ── Currency Formatting (manual, no Intl.NumberFormat for RN) ──

export const formatCurrencyINR = (amount: number): string => {
  const isNegative = amount < 0;
  const abs = Math.abs(amount);

  let formatted: string;
  if (abs >= 10000000) {
    formatted = `${(abs / 10000000).toFixed(2)} Cr`;
  } else if (abs >= 100000) {
    formatted = `${(abs / 100000).toFixed(2)} L`;
  } else if (abs >= 1000) {
    formatted = `${(abs / 1000).toFixed(1)}K`;
  } else {
    formatted = abs.toString();
  }

  return `${isNegative ? '-' : ''}₹${formatted}`;
};

// ── Number Formatting ──

export const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

export const formatPercentage = (value: number, decimals = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

// ── Misc Formatters ──

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const truncate = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
};
