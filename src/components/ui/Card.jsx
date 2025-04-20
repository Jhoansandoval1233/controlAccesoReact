import React from 'react';

const Card = ({ 
  children, 
  title, 
  className = '', 
  headerClass = '',
  bodyClass = ''
}) => {
  return (
    <div className={`card shadow-sm ${className}`}>
      {title && (
        <div className={`card-header bg-light text-center p-3${headerClass}`}>
          <h5 className="card-title mb-0">{title}</h5>
        </div>
      )}
      <div className={`card-body p-4 ${bodyClass}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;
