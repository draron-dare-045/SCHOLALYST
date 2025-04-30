import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { getDatabase, ref, push } from 'firebase/database';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import CountryFilter from '../components/CountryFilter';
import UniversityList from '../components/UniversityList';
import ErrorMessage from '../components/ErrorMessage';

function Home() {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  // Handle saving university to the user's basket
  const handleSaveUniversity = (university) => {
    if (auth.currentUser) {
      const db = getDatabase();
      const userBasketRef = ref(db, `userBaskets/${auth.currentUser.uid}`);

      push(userBasketRef, university)
        .then(() => {
          alert(`University "${university.name}" added to your basket.`);
        })
        .catch((error) => {
          console.error("Error saving university: ", error.message);
          alert('Failed to save university to your basket.');
        });
    } else {
      alert('Please log in to save universities.');
    }
  };

  // Fetch universities data when the component mounts
  useEffect(() => {
    axios.get('https://backend-scholalyst.onrender.com/universities')
      .then(response => {
        setUniversities(response.data);
        setFilteredUniversities(response.data);
      })
      .catch(err => {
        console.error('Error fetching universities:', err);
        setError('Failed to load universities. Please try again later.');
      });
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const searchLower = e.target.value.toLowerCase();
    const filtered = universities.filter(university =>
      university.name.toLowerCase().includes(searchLower)
    );
    setFilteredUniversities(filtered);
  };

  // Handle filter functionality by country
  const handleCountryFilter = (e) => {
    setSelectedCountry(e.target.value);
    if (e.target.value === '') {
      setFilteredUniversities(universities);
    } else {
      const filtered = universities.filter(university =>
        university.country === e.target.value
      );
      setFilteredUniversities(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-pulse-slow">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 tracking-wider">
            University Portal
          </h1>
          <p className="text-lg text-cyan-300 max-w-2xl mx-auto font-light">
            Explore and save top universities with cutting-edge search technology.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-6 border border-cyan-500/20 shadow-lg shadow-cyan-500/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SearchBar 
            searchQuery={searchQuery} 
            handleSearch={handleSearch} 
          />
          <CountryFilter 
            selectedCountry={selectedCountry} 
            handleCountryFilter={handleCountryFilter} 
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/40 text-red-300 rounded-lg p-4 text-center">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* University List Section */}
        <div className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-8 border border-cyan-500/20 shadow-lg shadow-cyan-500/10 transform transition-all duration-500 hover:scale-[1.01] hover:shadow-cyan-500/30">
          <UniversityList 
            filteredUniversities={filteredUniversities} 
            handleSaveUniversity={handleSaveUniversity} 
          />
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>
        {`
          @keyframes pulse-slow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}

export default Home;