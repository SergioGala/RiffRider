import React, { useState, useEffect } from 'react';

const GlitchText = ({ text }) => {
  const [glitchedText, setGlitchedText] = useState(text);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        const glitchDuration = 100 + Math.random() * 100;
        setGlitchedText(text.split('').map(char => 
          Math.random() < 0.5 ? String.fromCharCode(char.charCodeAt(0) + Math.floor(Math.random() * 10) - 5) : char
        ).join(''));
        setTimeout(() => setGlitchedText(text), glitchDuration);
      }
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, [text]);

  return <span className="glitch-text">{glitchedText}</span>;
};

export default GlitchText;