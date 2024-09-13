import React, { useState, useEffect, useCallback } from 'react';

const PartyMode = ({ isActive }) => {
  const [gridLines, setGridLines] = useState([]);
  const [pulses, setPulses] = useState([]);
  const [glitches, setGlitches] = useState([]);
  const [waveforms, setWaveforms] = useState([]);

  const colors = ['#00FFFF', '#39FF14', '#00FF00', '#0000FF'];

  const createGridLine = useCallback(() => {
    const newLine = {
      id: Date.now(),
      isHorizontal: Math.random() > 0.5,
      position: `${Math.random() * 100}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setGridLines(prev => [...prev, newLine]);
    setTimeout(() => {
      setGridLines(prev => prev.filter(line => line.id !== newLine.id));
    }, 2000);
  }, []);

  const createPulse = useCallback(() => {
    const newPulse = {
      id: Date.now(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 100 + 50,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setPulses(prev => [...prev, newPulse]);
    setTimeout(() => {
      setPulses(prev => prev.filter(pulse => pulse.id !== newPulse.id));
    }, 1000);
  }, []);

  const createGlitch = useCallback(() => {
    const newGlitch = {
      id: Date.now(),
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 20 + 10}%`,
      height: `${Math.random() * 5 + 2}px`,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setGlitches(prev => [...prev, newGlitch]);
    setTimeout(() => {
      setGlitches(prev => prev.filter(glitch => glitch.id !== newGlitch.id));
    }, 150);
  }, []);

  const createWaveform = useCallback(() => {
    const newWaveform = {
      id: Date.now(),
      bottom: `${Math.random() * 20}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setWaveforms(prev => [...prev, newWaveform]);
    setTimeout(() => {
      setWaveforms(prev => prev.filter(wave => wave.id !== newWaveform.id));
    }, 3000);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const gridInterval = setInterval(createGridLine, 200);
    const pulseInterval = setInterval(createPulse, 500);
    const glitchInterval = setInterval(createGlitch, 100);
    const waveformInterval = setInterval(createWaveform, 1000);

    return () => {
      clearInterval(gridInterval);
      clearInterval(pulseInterval);
      clearInterval(glitchInterval);
      clearInterval(waveformInterval);
    };
  }, [isActive, createGridLine, createPulse, createGlitch, createWaveform]);

  if (!isActive) return null;

  return (
    <div className="party-mode techno">
      {gridLines.map(line => (
        <div
          key={line.id}
          className={`grid-line ${line.isHorizontal ? 'horizontal' : 'vertical'}`}
          style={{
            [line.isHorizontal ? 'top' : 'left']: line.position,
            backgroundColor: line.color,
          }}
        />
      ))}
      {pulses.map(pulse => (
        <div
          key={pulse.id}
          className="pulse"
          style={{
            left: `${pulse.x}%`,
            top: `${pulse.y}%`,
            width: `${pulse.size}px`,
            height: `${pulse.size}px`,
            borderColor: pulse.color,
          }}
        />
      ))}
      {glitches.map(glitch => (
        <div
          key={glitch.id}
          className="glitch"
          style={{
            top: glitch.top,
            left: glitch.left,
            width: glitch.width,
            height: glitch.height,
            backgroundColor: glitch.color,
          }}
        />
      ))}
      {waveforms.map(wave => (
        <div
          key={wave.id}
          className="waveform"
          style={{
            bottom: wave.bottom,
            backgroundColor: wave.color,
          }}
        />
      ))}
    </div>
  );
};

export default PartyMode;