import React from 'react';
import { usePalette } from 'color-thief-react';
import { themes } from './themes'; // Asegúrate de que la ruta sea correcta

const DynamicTheme = ({ albumCover, isEnabled, currentTheme }) => {
  const { data: palette, loading, error } = usePalette(albumCover, 5, 'hex', { crossOrigin: 'anonymous', quality: 10 });

  React.useEffect(() => {
    if (isEnabled && palette) {
      document.documentElement.style.setProperty('--primary', palette[0]);
      document.documentElement.style.setProperty('--secondary', palette[1]);
      document.documentElement.style.setProperty('--background', palette[4]);
      document.documentElement.style.setProperty('--text', palette[2]);
    } else {
      // Restaurar el tema seleccionado por el usuario
      const theme = themes[currentTheme];
      Object.keys(theme).forEach(key => {
        document.documentElement.style.setProperty(`--${key}`, theme[key]);
      });
    }
  }, [palette, isEnabled, currentTheme]);

  if (loading || error) return null;

  return null; // Este componente no renderiza nada visible
};

export default DynamicTheme;