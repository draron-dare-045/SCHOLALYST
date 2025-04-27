// components/ToggleSwitch.jsx
import React from 'react';

function ToggleSwitch({ isSignUp, onToggle }) {
  return (
    <div className="mt-4 text-center">
      <button 
        className="text-sm text-blue-500 hover:underline" 
        onClick={onToggle}
      >
        {isSignUp ? 'Already have an account? Sign In' : 'Don’t have an account? Sign Up'}
      </button>
    </div>
  );
}

export default ToggleSwitch;
