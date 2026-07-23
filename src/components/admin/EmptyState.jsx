import React from 'react';
import { PackageOpen } from 'lucide-react';

const EmptyState = ({ title = 'No data found', message = 'There is nothing to display here right now.', icon: Icon = PackageOpen }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 w-full text-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm">{message}</p>
    </div>
  );
};

export default EmptyState;
