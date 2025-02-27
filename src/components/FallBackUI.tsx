import React from 'react';

const FallbackUI: React.FC = () => {
  return (
    <div className="text-center p-4">
      <h2 className="text-xl font-semibold text-gray-500">Oops! Something went wrong.</h2>
      <p className="mt-2 text-gray-600">We couldn't fetch the items. Please try again later.</p>
    </div>
  );
};

export default FallbackUI;
