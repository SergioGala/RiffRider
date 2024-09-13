import React, { useEffect, useState, useCallback } from 'react';

const TechnoLines = () => {
  const [lines, setLines] = useState([]);
  const [beat, setBeat] = useState(0);

  const createLine = useCallback(() => ({
    left: `${Math.random() * 100}%`,
    width: `${Math.random() * 3 + 1}px`,
    height: `${Math.random() * 30 + 10}%`,
    animationDuration: `${Math.random() * 3 + 5}s`,
    animationDelay: `${Math.random() * 2}s`,
    opacity: Math.random() * 0.5 + 0.5
  }), []);

  useEffect(() => {
    const createLines = () => {
      const newLines = Array(15).fill().map(createLine);
      setLines(newLines);
    };

    createLines();
    const lineInterval = setInterval(createLines, 8000);

    // Simular un beat
    const beatInterval = setInterval(() => {
      setBeat((prevBeat) => (prevBeat + 1) % 4);
    }, 500); // 120 BPM

    return () => {
      clearInterval(lineInterval);
      clearInterval(beatInterval);
    };
  }, [createLine]);

  return (
    <div className="techno-lines">
      {lines.map((line, index) => (
        <div
          key={index}
          className={`techno-line ${beat === 0 ? 'pulse' : ''}`}
          style={{
            left: line.left,
            width: line.width,
            height: line.height,
            animationDuration: line.animationDuration,
            animationDelay: line.animationDelay,
            opacity: line.opacity,
            transform: `scaleY(${1 + beat * 0.1})`
          }}
        />
      ))}
    </div>
  );
};

export default TechnoLines;