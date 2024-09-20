import React, { useState } from 'react';
import { themes } from './themes';

const ThemeSelector = ({ currentTheme, setCurrentTheme, isDynamicThemeEnabled, setIsDynamicThemeEnabled }) => {
  const [showAllThemes, setShowAllThemes] = useState(false);

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
  };

  return (
    <div className="theme-selector">
      <button 
        onClick={() => setIsDynamicThemeEnabled(!isDynamicThemeEnabled)}
        className="dynamic-theme-toggle"
      >
        {isDynamicThemeEnabled ? 'Desactivar' : 'Activar'} Tema Dinámico
      </button>
      <button 
        onClick={() => setShowAllThemes(!showAllThemes)} 
        className="show-all-themes-button"
      >
        {showAllThemes ? 'OCULTAR TEMAS' : 'TEMAS MUSICALES'}
      </button>
      <div className="theme-buttons-container">
        {(showAllThemes ? Object.keys(themes) : Object.keys(themes).slice(0, 5)).map(theme => (
          <button 
            key={theme} 
            onClick={() => handleThemeChange(theme)} 
            className={`theme-button ${currentTheme === theme ? 'active glow-pulse' : ''}`}
          >
            {theme}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;