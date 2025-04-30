// pages/UniversityBasketPage.jsx
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { auth } from '../firebase';
import UniversityCard from '../components/UniversityCard';
import ErrorMessage from '../components/ErrorMessage';

function UniversityBasketPage() {
  const [savedUniversities, setSavedUniversities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      const db = getDatabase();
      const userBasketRef = ref(db, `userBaskets/${auth.currentUser.uid}`);

      onValue(userBasketRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const universities = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setSavedUniversities(universities);
        } else {
          setSavedUniversities([]);
        }
      });
    } else {
      setError('Please log in to view your basket.');
    }
  }, []);

  const deleteUniversity = (universityId) => {
    if (auth.currentUser) {
      const db = getDatabase();
      const universityRef = ref(db, `userBaskets/${auth.currentUser.uid}/${universityId}`);
      remove(universityRef)
        .then(() => {
          setSavedUniversities((prevUniversities) =>
            prevUniversities.filter((university) => university.id !== universityId)
          );
        })
        .catch((error) => {
          console.error('Error deleting university:', error);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-8 tracking-wide animate-pulse">
        UNIVERSITY BASKET
      </h1>

      {/* Display Error Message if there's an error */}
      {error && <ErrorMessage message={error} />}

      {/* Display Saved Universities */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl">
        {savedUniversities.length > 0 ? (
          savedUniversities.map((university) => (
            <div
              key={university.id}
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            >
              <UniversityCard university={university} onDelete={deleteUniversity} />
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-cyan-300 col-span-full animate-fade-in">
            Your basket is empty.
          </p>
        )}
      </div>
    </div>
  );
}

export default UniversityBasketPage;