import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { getDatabase, ref, push } from 'firebase/database';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import CountryFilter from '../components/CountryFilter';
import UniversityList from '../components/UniversityList'; // New component for listing universities
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
        setFilteredUniversities(response.data); // Set the universities to display
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
    <div className="min-h-screen bg-gray-100 p-8" style={{ backgroundImage: `url('public/background.png')` }}>
      <h1 className="text-4xl font-bold text-center mb-8 text-white">WELCOME TO THE UNIVERSITY PORTAL</h1>

      {/* Search Bar Component */}
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />

      {/* Country Filter Component */}
      <CountryFilter selectedCountry={selectedCountry} handleCountryFilter={handleCountryFilter} />

      {/* Error Message */}
      {error && <ErrorMessage message={error} />}

      {/* University List Component */}
      <UniversityList 
        filteredUniversities={filteredUniversities} 
        handleSaveUniversity={handleSaveUniversity} 
      />
    </div>
  );
}

export default Home;
