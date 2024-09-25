import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';
import { themes } from './themes'; // Asegúrate de que la ruta sea correcta

const ThemeCarousel = React.memo(({ currentTheme, setCurrentTheme, isDynamicThemeEnabled, setIsDynamicThemeEnabled }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const themeKeys = useMemo(() => Object.keys(themes), []);

  const nextTheme = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === themeKeys.length - 1 ? 0 : prevIndex + 1
    );
  }, [themeKeys]);

  const prevTheme = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? themeKeys.length - 1 : prevIndex - 1
    );
  }, [themeKeys]);

  const toggleDarkMode = useCallback(() => {
    setCurrentTheme(prevTheme => ({
      ...prevTheme,
      mode: prevTheme.mode === 'light' ? 'dark' : 'light'
    }));
  }, [setCurrentTheme]);

  useEffect(() => {
    const newThemeName = themeKeys[currentIndex];
    if (newThemeName && themes[newThemeName]) {
      const newThemeData = themes[newThemeName][currentTheme.mode || 'light'];
      setCurrentTheme(prevTheme => ({
        name: newThemeName,
        mode: prevTheme.mode || 'light',
        ...newThemeData
      }));

      // Aplicar estilos de fondo directamente al body
      document.body.style.backgroundColor = newThemeData.background;
      document.body.style.backgroundImage = newThemeData.pattern || 'none';
    }
  }, [currentIndex, setCurrentTheme, themeKeys, currentTheme.mode]);

  const currentThemeData = useMemo(() => {
    return currentTheme && themes[currentTheme.name] && themes[currentTheme.name][currentTheme.mode]
      ? themes[currentTheme.name][currentTheme.mode]
      : themes.pop.light;
  }, [currentTheme]);

  const animationStyle = useMemo(() => {
    if (currentThemeData.animation && currentThemeData.animation.name) {
      return { animation: `${currentThemeData.animation.name} 2s infinite` };
    }
    return {};
  }, [currentThemeData]);

  useEffect(() => {
    if (currentThemeData.animation && currentThemeData.animation.name) {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes ${currentThemeData.animation.name} {
          ${currentThemeData.animation.keyframes}
        }
      `;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [currentThemeData]);

  const darkModeButtonStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#ffffff',
    border: '2px solid #ffffff',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginLeft: '10px', // Añadido para dar espacio entre el carrusel y el botón
  };

  if (process.env.NODE_ENV !== 'production') {
    console.log('Current theme:', currentTheme);
    console.log('Available themes:', themeKeys);
    console.log('Current theme data:', currentThemeData);
  }

  return (
    <div className="theme-carousel" style={{ 
      fontFamily: currentThemeData.font,
      color: currentThemeData.text,
      display: 'flex',
      alignItems: 'center',
    }}>
      <div>
        <button 
          onClick={() => setIsDynamicThemeEnabled(!isDynamicThemeEnabled)}
          className="dynamic-theme-toggle"
          style={{
            background: currentThemeData.buttonGradient,
            color: currentThemeData.text,
            boxShadow: currentThemeData.boxShadow
          }}
        >
          {isDynamicThemeEnabled ? 'Desactivar' : 'Activar'} Tema Dinámico
        </button>
        <div className="carousel-container" style={{ background: currentThemeData.background }}>
          <button className="carousel-button prev" onClick={prevTheme}>
            <ChevronLeft color={currentThemeData.text} />
          </button>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="theme-item"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              style={animationStyle}
            >
              <div className="theme-preview" style={{ 
                backgroundColor: currentThemeData.background,
                color: currentThemeData.text,
                backgroundImage: currentThemeData.pattern
              }}>
                <span className="theme-name">{currentTheme.name}</span>
                <div className="color-preview primary" style={{ backgroundColor: currentThemeData.primary }}></div>
                <div className="color-preview secondary" style={{ backgroundColor: currentThemeData.secondary }}></div>
              </div>
            </motion.div>
          </AnimatePresence>
          <button className="carousel-button next" onClick={nextTheme}>
            <ChevronRight color={currentThemeData.text} />
          </button>
        </div>
      </div>
      <button 
        onClick={toggleDarkMode} 
        style={darkModeButtonStyle}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {currentTheme.mode === 'dark' ? <Sun color="#ffffff" size={24} /> : <Moon color="#ffffff" size={24} />}
      </button>
    </div>
  );
});

export default ThemeCarousel;