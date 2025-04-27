// pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleSignIn, emailSignUp, emailSignIn } from '../firebase';
import FormHeader from '../components/FormHeader';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import ToggleSwitch from '../components/ToggleSwitch';
import ErrorMessage from '../components/ErrorMessage';

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
        {/* Form Header */}
        <FormHeader isSignUp={isSignUp} />

        {/* Error Message */}
        {error && <ErrorMessage message={error} />}

        {/* Name input for sign-up */}
        {isSignUp && (
          <FormInput
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            label="Full Name"
            required
          />
        )}

        <FormInput
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          label="Email"
          required
        />

        <FormInput
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          label="Password"
          required
        />

        {/* Form Button */}
        <FormButton 
          loading={loading} 
          onClick={handleEmailLogin} 
          text={isSignUp ? 'Sign Up' : 'Sign In'} 
          disabled={loading}
        />

        {/* Google Login Button */}
        <div className="mt-4 text-center">
          <FormButton 
            loading={loading} 
            onClick={handleGoogleLogin} 
            text="Sign In with Google" 
            disabled={loading}
          />
        </div>

        {/* Toggle Sign Up/Sign In */}
        <ToggleSwitch 
          isSignUp={isSignUp} 
          onToggle={() => setIsSignUp(!isSignUp)} 
        />
      </div>
    </div>
  );
}

export default Login;
