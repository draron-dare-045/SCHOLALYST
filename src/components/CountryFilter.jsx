import React from 'react';

function CountryFilter({ selectedCountry, handleCountryFilter }) {
  return (
    <div className="text-center mb-6">
      <select
        value={selectedCountry}
        onChange={handleCountryFilter}
        className="px-4 py-2 rounded-lg border border-gray-300 text-lg"
      >
        <option value="">All Countries</option>
        {['United States', 'United Kingdom', 'Canada', 'Australia'].map((country, index) => (
          <option key={index} value={country}>{country}</option>
        ))}
      </select>
    </div>
  );
}

export default CountryFilter;
