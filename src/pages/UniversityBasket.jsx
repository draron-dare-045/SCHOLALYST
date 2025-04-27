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
          const universities = Object.keys(data).map(key => ({
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
          // Remove the university from the local state after deletion
          setSavedUniversities(prevUniversities => prevUniversities.filter(university => university.id !== universityId));
        })
        .catch((error) => {
          console.error('Error deleting university:', error);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8"
      style={{ backgroundImage: `url('public/images.jpeg')` }}>
      <h1 className="text-3xl font-bold text-center mb-6">UNIVERSITY BASKET</h1>

      {/* Display Error Message if there's an error */}
      {error && <ErrorMessage message={error} />}

      {/* Display Saved Universities */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {savedUniversities.length > 0 ? (
          savedUniversities.map((university) => (
            <UniversityCard key={university.id} university={university} onDelete={deleteUniversity} />
          ))
        ) : (
          <p className="text-center">Your basket is empty.</p>
        )}
      </div>
    </div>
  );
}

export default UniversityBasketPage;
