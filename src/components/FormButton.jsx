// components/FormButton.jsx
import React from 'react';

function FormButton({ loading, onClick, text, disabled }) {
  return (
    <button 
      className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white py-2 rounded-md hover:bg-blue-600`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? 'Loading...' : text}
    </button>
  );
}

export default FormButton;
