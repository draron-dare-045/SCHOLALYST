import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { auth } from '../firebase';

function UniversityBasket() {
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
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Display Saved Universities */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {savedUniversities.length > 0 ? (
          savedUniversities.map((university) => (
            <div key={university.id} className="bg-white p-4 shadow-lg rounded-lg">
              <h2 className="text-xl font-bold">{university.name}</h2>
              <p><strong>Country:</strong> {university.country}</p>
              <p><strong>Website:</strong> <a href={university.web_pages[0]} target="_blank" rel="noopener noreferrer" className="text-blue-500">{university.web_pages[0]}</a></p>
              <p><strong>Domains:</strong> {university.domains.join(', ')}</p>

              {/* Delete Button */}
              <button
                onClick={() => deleteUniversity(university.id)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center">Your basket is empty.</p>
        )}
      </div>
    </div>
  );
}

export default UniversityBasket;
