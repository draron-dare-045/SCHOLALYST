import React from 'react';

function UniversityCard({ university, handleSaveUniversity }) {
  return (
    <div className="bg-white p-4 shadow-lg rounded-lg hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-bold">{university.name}</h2>
      <p><strong>Country:</strong> {university.country}</p>
      <p><strong>Website:</strong> 
        <a href={university.web_pages[0]} target="_blank" rel="noopener noreferrer" className="text-blue-500">
          {university.web_pages[0]}
        </a>
      </p>
      <p><strong>Domains:</strong> {university.domains.join(', ')}</p>
      <button
        onClick={() => handleSaveUniversity(university)}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
      >
        Save to Basket
      </button>
    </div>
  );
}

export default UniversityCard;
