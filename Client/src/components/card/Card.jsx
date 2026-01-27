import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 md:p-8 w-full max-w-md mx-auto">
      {children}
    </div>
  );
};

export default Card;
