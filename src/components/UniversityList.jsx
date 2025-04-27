import React from 'react';
import UniversityCard from './UniversityCard'; // Import UniversityCard

const UniversityList = ({ filteredUniversities, handleSaveUniversity }) => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {filteredUniversities.length > 0 ? (
        filteredUniversities.map((university, index) => (
          <UniversityCard 
            key={index} 
            university={university} 
            handleSaveUniversity={handleSaveUniversity} 
          />
        ))
      ) : (
        <p className="text-center">No universities found.</p>
      )}
    </div>
  );
};

export default UniversityList;
