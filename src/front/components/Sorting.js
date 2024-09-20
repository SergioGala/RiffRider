import React from 'react';

function Sorting({ sortCriteria, setSortCriteria, sortOrder, setSortOrder }) {
  return (
    <div className="sorting-controls">
      <select 
        value={sortCriteria} 
        onChange={(e) => setSortCriteria(e.target.value)}
        className="sort-select"
      >
        <option value="name">Título</option>
        <option value="artists">Artista</option>
        <option value="album">Álbum</option>
      </select>
      <button 
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        className="sort-order-btn"
      >
        {sortOrder === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
}

export default Sorting;