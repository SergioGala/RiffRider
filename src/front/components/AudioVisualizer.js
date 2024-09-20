import React, { useRef, useEffect, useState } from 'react';

const AudioVisualizer = () => {
  const canvasRef = useRef(null);
  const [theme, setTheme] = useState({
    primary: '#39FF14',
    secondary: '#00FFFF',
    background: '#000000'
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 100;
    };

    const drawVisualizer = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = theme.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particleCount = 50;
      const radius = 2;
      const lineThreshold = 50;

      // Theme-specific parameters
      const speedMultiplier = getSpeedMultiplier(theme.primary);
      const amplitudeMultiplier = getAmplitudeMultiplier(theme.primary);

      for (let i = 0; i < particleCount; i++) {
        const x = Math.sin(timestamp / 2000 * speedMultiplier + i) * canvas.width / 2 * amplitudeMultiplier + canvas.width / 2;
        const y = Math.cos(timestamp / 1500 * speedMultiplier + i) * canvas.height / 2 * amplitudeMultiplier + canvas.height / 2;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? theme.primary : theme.secondary;
        ctx.fill();

        for (let j = i + 1; j < particleCount; j++) {
          const x2 = Math.sin(timestamp / 2000 * speedMultiplier + j) * canvas.width / 2 * amplitudeMultiplier + canvas.width / 2;
          const y2 = Math.cos(timestamp / 1500 * speedMultiplier + j) * canvas.height / 2 * amplitudeMultiplier + canvas.height / 2;

          const distance = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));

          if (distance < lineThreshold) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(${parseInt(theme.primary.slice(1, 3), 16)}, ${parseInt(theme.primary.slice(3, 5), 16)}, ${parseInt(theme.primary.slice(5, 7), 16)}, ${1 - distance / lineThreshold})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(drawVisualizer);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    drawVisualizer();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  useEffect(() => {
    const updateThemeColors = () => {
      setTheme({
        primary: getComputedStyle(document.documentElement).getPropertyValue('--primary').trim(),
        secondary: getComputedStyle(document.documentElement).getPropertyValue('--secondary').trim(),
        background: getComputedStyle(document.documentElement).getPropertyValue('--background').trim()
      });
    };

    updateThemeColors();
    window.addEventListener('themechange', updateThemeColors);

    return () => {
      window.removeEventListener('themechange', updateThemeColors);
    };
  }, []);

  return <canvas ref={canvasRef} className="audio-visualizer" />;
};

// Helper functions to determine theme-specific parameters
const getSpeedMultiplier = (primaryColor) => {
  // Convert primary color to HSL and use the hue to determine speed
  const hsl = hexToHSL(primaryColor);
  return 0.5 + (hsl.h / 360) * 1.5; // Speed range: 0.5 to 2
};

const getAmplitudeMultiplier = (primaryColor) => {
  // Use the lightness of the primary color to determine amplitude
  const hsl = hexToHSL(primaryColor);
  return 0.7 + (hsl.l / 100) * 0.6; // Amplitude range: 0.7 to 1.3
};

// Helper function to convert hex to HSL
const hexToHSL = (hex) => {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

export default AudioVisualizer;