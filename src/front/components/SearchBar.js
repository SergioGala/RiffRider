import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ setSearchTerm }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localSearchTerm.trim()) {
      setSearchTerm(localSearchTerm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar-container">
      <input
        type="text"
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        placeholder="Buscar canciones..."
        className="search-input"
      />
      <button type="submit" className="search-button">
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;