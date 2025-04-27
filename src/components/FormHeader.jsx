// components/FormHeader.jsx
import React from 'react';

function FormHeader({ isSignUp }) {
  return (
    <h2 className="text-2xl font-bold mb-4 text-center">
      {isSignUp ? 'Sign Up' : 'Sign In'}
    </h2>
  );
}

export default FormHeader;
