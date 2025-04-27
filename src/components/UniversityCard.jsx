import React from 'react';

function UniversityCard({ university }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-4 w-full max-w-md">
      <h2 className="text-xl font-bold mb-2">{university.name}</h2>
      <p className="text-gray-600 mb-4">{university.country}</p>
      <a 
        href={university.website} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        Visit Website
      </a>

      <button className="block mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
        Shortlist
      </button>
    </div>
  );
}

export default UniversityCard;
