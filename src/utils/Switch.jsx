import React from 'react';

const Switch = ({ checked, onChange, size = 'md' }) => {
  const sizes = {
    sm: {
      width: '2.5rem',
      height: '1.25rem',
      translate: '1.25rem'
    },
    md: {
      width: '3rem',
      height: '1.5rem',
      translate: '1.5rem'
    },
    lg: {
      width: '3.5rem',
      height: '1.75rem',
      translate: '1.75rem'
    }
  };

  return (
    <button
      type="button"
      className={`relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500
        ${checked ? 'bg-blue-600' : 'bg-gray-600'}
        ${size === 'sm' ? 'h-5 w-10' : size === 'md' ? 'h-6 w-12' : 'h-7 w-14'}`}
      onClick={() => onChange(!checked)}
    >
      <span
        className={`inline-block transform transition-transform rounded-full bg-white shadow
          ${checked ? 'translate-x-6' : 'translate-x-1'}
          ${size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-5 w-5' : 'h-6 w-6'}`}
      />
    </button>
  );
};

export default Switch;