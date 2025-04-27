import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleSignIn, emailSignUp, emailSignIn } from '../firebase';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // State for storing user's name during sign-up
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for buttons

  // Google login handler
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleSignIn();
      navigate('/home'); // Redirect to home page after successful login
    } catch (err) {
      console.error("Google login error: ", err.message);
      setError("Something went wrong with Google login.");
    }
    setLoading(false);
  };

  // Email login or sign-up handler
  const handleEmailLogin = async () => {
    if (!email || !password || (isSignUp && !name)) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      if (isSignUp) {
        await emailSignUp(email, password, name); // Sign up with name, email, and password
        navigate('/home'); // Redirect to home page after successful sign-up
      } else {
        await emailSignIn(email, password); // Sign in with existing account
        navigate('/home'); // Redirect to home page after successful sign-in
      }
    } catch (err) {
      console.error("Email sign-up/sign-in error: ", err.message);
      setError(isSignUp ? "Error signing up. Please try again." : "Error logging in. Please check your credentials.");
    }
    setLoading(false);
  };

  return (
    <div 
      className="flex justify-center items-center min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: "url('/background.png')" }} // Ensure image is accessible in public folder
    >
      <div className="p-8 bg-white bg-opacity-80 shadow-lg rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {/* Name input for sign-up */}
        {isSignUp && (
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input 
              type="text" 
              id="name" 
              className="mt-1 block w-full p-2 border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)} 
              required 
              placeholder="Enter your full name"
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            id="email" 
            className="mt-1 block w-full p-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            id="password" 
            className="mt-1 block w-full p-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
            placeholder="Enter your password"
          />
        </div>

        <button 
          className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white py-2 rounded-md hover:bg-blue-600`}
          onClick={handleEmailLogin}
          disabled={loading}
        >
          {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </button>

        <div className="mt-4 text-center">
          <button 
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-red-500'} text-white py-2 rounded-md hover:bg-red-600`}
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Sign In with Google'}
          </button>
        </div>

        <div className="mt-4 text-center">
          <button 
            className="text-sm text-blue-500 hover:underline" 
            onClick={() => setIsSignUp(!isSignUp)} // Toggle between Sign Up and Sign In
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Don’t have an account? Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
