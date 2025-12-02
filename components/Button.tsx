
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'active';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:pointer-events-none rounded-xl";
  
  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-500 focus:ring-brand-500 shadow-lg shadow-brand-500/20",
    secondary: "bg-slate-800 text-white hover:bg-slate-700 focus:ring-slate-500 border border-slate-700",
    outline: "border-2 border-brand-500 text-brand-400 hover:bg-brand-500/10 focus:ring-brand-500",
    ghost: "text-slate-400 hover:text-white hover:bg-slate-800",
    active: "bg-brand-600 text-white shadow-lg shadow-brand-500/20 border border-brand-500",
  };

  const sizes = {
    sm: "h-9 px-4 text-xs",
    md: "h-11 px-6 text-sm",
    lg: "h-14 px-8 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;