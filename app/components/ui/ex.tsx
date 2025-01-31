import React from 'react';
interface Card_Data {
    children:React.ReactNode;
    className?:string;
}
interface Badge_data {
    children:React.ReactNode, 
    variant:string, 
    className:string
}
// Card Components
export const Card = ({ children, className = '' }:Card_Data) => (
  <div className={`rounded-lg border bg-white shadow-sm ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = '' }:Card_Data) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }:Card_Data) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

export const CardContent = ({ children, className = '' }:Card_Data) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

// Badge Component
export const Badge = ({ 
  children, 
  className = '' 
}:Badge_data) => {
  const variants = {
    'default': 'bg-primary text-primary-foreground hover:bg-primary/80',
    'secondary': 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    'destructive': 'bg-red-500 text-white hover:bg-red-600',
    'outline': 'border border-gray-200 text-gray-900 hover:bg-gray-100',
  };

  return (
    <div className={`
      inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors
      ${variants['default']}
      ${className}
    `}>
      {children}
    </div>
  );
};


