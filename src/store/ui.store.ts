import { create } from 'zustand';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration: number;
}

interface UIState {
  sidebarOpen: boolean;
  activeModule: string;
  toasts: Toast[];
  theme: 'light' | 'dark';
  modalState: { isOpen: boolean; modalId: string | null };

  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  setActiveModule: (module: string) => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

let toastCounter = 0;

// Initialize theme from localStorage if available
const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const saved = window.localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
  }
  return 'light';
};

const initialTheme = getInitialTheme();
if (typeof window !== 'undefined' && initialTheme === 'dark') {
  document.documentElement.classList.add('dark');
}

export const useUIStore = create<UIState>((set, get) => ({
  sidebarOpen: false,
  activeModule: 'dashboard',
  toasts: [],
  theme: initialTheme,
  modalState: { isOpen: false, modalId: null },

  openSidebar: () => set({ sidebarOpen: true }),
  closeSidebar: () => set({ sidebarOpen: false }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  setTheme: (theme) => {
    set({ theme });
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  },
  toggleTheme: () => set((s) => {
    const newTheme = s.theme === 'light' ? 'dark' : 'light';
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    return { theme: newTheme };
  }),

  setActiveModule: (module) => set({ activeModule: module }),

  addToast: (toast) => {
    const id = `toast-${++toastCounter}`;
    const newToast: Toast = { ...toast, id, duration: toast.duration || 4000 };
    set((s) => ({ toasts: [...s.toasts, newToast] }));

    // Auto-remove using setTimeout — no useEffect needed (RN compatible)
    setTimeout(() => {
      const current = get().toasts;
      set({ toasts: current.filter((t) => t.id !== id) });
    }, newToast.duration);
  },

  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  openModal: (modalId) => set({ modalState: { isOpen: true, modalId } }),
  closeModal: () => set({ modalState: { isOpen: false, modalId: null } }),
}));
