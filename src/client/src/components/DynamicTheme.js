import { useEffect } from 'react';
import { usePalette } from 'color-thief-react';

const DynamicTheme = ({ albumCover, isEnabled }) => {
  const { data: palette, loading, error } = usePalette(albumCover, 5, 'hex', { 
    crossOrigin: 'anonymous', 
    quality: 10 
  });

  useEffect(() => {
    if (isEnabled && palette) {
      document.documentElement.style.setProperty('--primary', palette[0]);
      document.documentElement.style.setProperty('--secondary', palette[1]);
      document.documentElement.style.setProperty('--background', palette[4]);
      document.documentElement.style.setProperty('--text', palette[2]);
    }
  }, [isEnabled, palette]);

  if (loading || error) return null;

  return null; // Este componente no renderiza nada visible
};

export default DynamicTheme;