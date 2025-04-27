import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function NavBar({ user }) {
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side: logo */}
        <div className="font-bold text-xl">ScholarHub</div>

        {/* Middle: nav links */}
        <div className="space-x-6">
          <Link to="/" className="hover:text-indigo-300">Home</Link>
          <Link to="/academic-files" className="hover:text-indigo-300">Academic Files</Link>
          <Link to="/university-basket" className="hover:text-indigo-300">University Basket</Link>
          <Link to="/study-plan" className="hover:text-indigo-300">Study Plan</Link>
        </div>

        {/* Right side: user's name and logout button */}
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <span className="font-medium">{user.displayName || user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
