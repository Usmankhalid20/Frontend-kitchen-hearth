import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 w-full h-full text-gray-500">
      <Loader2 className="w-8 h-8 animate-spin text-amber-500 mb-4" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default LoadingState;
