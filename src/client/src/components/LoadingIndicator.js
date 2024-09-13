import React from 'react';

function LoadingIndicator() {
  return (
    <div className="loading-indicator">
      <div className="spinner"></div>
      <p>Cargando canciones...</p>
    </div>
  );
}

export default LoadingIndicator;