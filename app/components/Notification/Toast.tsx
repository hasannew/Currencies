// utils/toast.ts
import toast from 'react-hot-toast';

interface ToastMessage {
  message: string;
  duration?: number;
}

export const showToast = {
  success: ({ message, duration }: ToastMessage) => {
    toast.success(message, { duration });
  },
  error: ({ message, duration }: ToastMessage) => {
    toast.error(message, { duration });
  },
  loading: ({ message, duration }: ToastMessage) => {
    toast.loading(message, { duration });
  },
  promise: async <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(promise, messages);
  },
  dismiss: () => {
    toast.dismiss();
  },
};