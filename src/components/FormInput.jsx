// components/FormInput.jsx
import React from 'react';

function FormInput({ id, type, value, onChange, placeholder, label, required }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <input 
        type={type} 
        id={id} 
        className="mt-1 block w-full p-2 border rounded-md"
        value={value}
        onChange={onChange} 
        required={required} 
        placeholder={placeholder}
      />
    </div>
  );
}

export default FormInput;
