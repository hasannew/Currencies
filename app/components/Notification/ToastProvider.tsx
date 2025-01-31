"use client";

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        // Default options for all toasts
        duration: 5000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        // Configuration for each toast type
        success: {
          duration: 3000,
          style: {
            background: 'green',
          },
          iconTheme: {
            primary: 'white',
            secondary: 'green',
          },
        },
        error: {
          duration: 4000,
          style: {
            background: 'red',
          },
          iconTheme: {
            primary: 'white',
            secondary: 'red',
          },
        },
      }}
    />
  );
}