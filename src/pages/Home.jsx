import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Import the Firebase auth instance
import axios from 'axios'; // For fetching the university data

function Home() {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [error, setError] = useState(null);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase sign out method
      navigate('/login'); // Redirect to the login page after logging out
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

  // Fetch universities data when the component mounts
  useEffect(() => {
    axios.get('https://backend-scholalyst.onrender.com/universities') // Use your backend URL here
      .then(response => {
        setUniversities(response.data); // Set universities data in state
      })
      .catch(err => {
        console.error('Error fetching universities:', err);
        setError('Failed to load universities. Please try again later.');
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome to the University Portal</h1>

      {/* Logout Button */}
      <div className="text-center mb-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg text-lg transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* Display Error Message if there's an error */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Display Universities */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {universities.length > 0 ? (
          universities.map((university, index) => (
            <div key={index} className="bg-white p-4 shadow-lg rounded-lg">
              <h2 className="text-xl font-bold">{university.name}</h2>
              <p><strong>Country:</strong> {university.country}</p>
              <p><strong>Website:</strong> <a href={university.web_pages[0]} target="_blank" rel="noopener noreferrer" className="text-blue-500">{university.web_pages[0]}</a></p>
              <p><strong>Domains:</strong> {university.domains.join(', ')}</p>
            </div>
          ))
        ) : (
          <p className="text-center">No universities found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
