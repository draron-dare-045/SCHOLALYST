import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">ScholarHub</div>
        <div className="space-x-6">
          <Link to="/" className="hover:text-indigo-300">Home</Link>
          <Link to="/academic-files" className="hover:text-indigo-300">Academic Files</Link>
          <Link to="/favorites" className="hover:text-indigo-300">Favorites</Link>
          <Link to="/study-plan" className="hover:text-indigo-300">Study Plan</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
