import React from 'react';

// Simple Avatar component for consistent styling
// Props: alt, src, className (optional)
const Avatar = ({ alt, src, className = '' }) => (
  <img
    alt={alt}
    src={src}
    className={`w-full h-full object-cover rounded-full ${className}`}
  />
);

export default Avatar;
