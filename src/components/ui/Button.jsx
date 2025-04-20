import React from 'react';
import '../../styles.css';

const Button = ({ 
  type = 'button', 
  onClick, 
  className = '', 
  children, 
  variant = 'primary' 
}) => {
  const getVariantClasses = () => {
    switch(variant) {
      case 'primary':
        return 'bg-primary text-white hover:bg-primary-dark';
      case 'secondary':
        return 'bg-secondary text-white hover:bg-secondary-dark';
      case 'success':
        return 'bg-success text-white hover:bg-success-dark';
      default:
        return 'bg-primary text-white hover:bg-primary-dark';
    }
  };

  const baseClasses = `
    btn 
    w-100 
    mt-4 
    py-2 
    px-4 
    rounded-lg 
    font-medium 
    transition-all 
    duration-200 
    ease-in-out 
    shadow-sm 
    hover:shadow-md
    ${getVariantClasses()} 
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClasses}
    >
      {children}
    </button>
  );
};

export default Button;
