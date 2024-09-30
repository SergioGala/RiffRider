import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, Music } from 'lucide-react';
import styled from 'styled-components';
import AudioPlayer from './AudioPlayer.js';

// Función para generar colores dinámicos basados en el audio
const generateDynamicColors = (bass, mid, treble) => {
  const r = Math.floor(bass * 255);
  const g = Math.floor(mid * 255);
  const b = Math.floor(treble * 255);
  return `rgb(${r}, ${g}, ${b})`;
};

// Estilos con styled-components
const AmbientScreenWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transition: background 0.5s ease;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 24px;
`;

const SensitivityControl = styled.div`
  position: absolute;
  bottom: 40px;
  right: 20px;
  display: flex;
  align-items: center;
  color: var(--text);
  font-family: var(--font);
  z-index: 1000;
  background: rgba(0, 0, 0, 0.6);
  padding: 10px 20px;
  border-radius: 30px;
  box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.3);

  label {
    margin-right: 15px;
    text-shadow: 0 0 5px var(--primary);
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  input[type="range"] {
    -webkit-appearance: none;
    width: 200px;
    height: 4px;
    background: rgba(var(--secondary-rgb), 0.2);
    border-radius: 2px;
    outline: none;
    opacity: 0.7;
    transition: all 0.3s ease;

    &:hover {
      opacity: 1;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--primary);
      cursor: pointer;
      box-shadow: 0 0 10px var(--primary), 0 0 20px var(--primary), 0 0 40px var(--primary);
      transition: all 0.3s ease;
      animation: pulse 2s infinite;
    }

    &::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border: none;
      border-radius: 50%;
      background: var(--primary);
      cursor: pointer;
      box-shadow: 0 0 10px var(--primary), 0 0 20px var(--primary), 0 0 40px var(--primary);
      transition: all 0.3s ease;
      animation: pulse 2s infinite;
    }

    &::-webkit-slider-thumb:hover,
    &::-moz-range-thumb:hover {
      box-shadow: 0 0 15px var(--primary), 0 0 30px var(--primary), 0 0 60px var(--primary);
      transform: scale(1.2);
    }

    &::-webkit-slider-runnable-track {
      height: 4px;
      background: linear-gradient(to right, 
        var(--primary) 0%, 
        var(--primary) var(--value-percent, 50%), 
        rgba(var(--secondary-rgb), 0.3) var(--value-percent, 50%), 
        rgba(var(--secondary-rgb), 0.3) 100%
      );
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    &::-moz-range-track {
      height: 4px;
      background: linear-gradient(to right, 
        var(--primary) 0%, 
        var(--primary) var(--value-percent, 50%), 
        rgba(var(--secondary-rgb), 0.3) var(--value-percent, 50%), 
        rgba(var(--secondary-rgb), 0.3) 100%
      );
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    &:focus {
      outline: none;
    }

    &:focus::-webkit-slider-runnable-track {
      background: linear-gradient(to right, 
        var(--secondary) 0%, 
        var(--secondary) var(--value-percent, 50%), 
        rgba(var(--primary-rgb), 0.3) var(--value-percent, 50%), 
        rgba(var(--primary-rgb), 0.3) 100%
      );
    }

    &:focus::-moz-range-track {
      background: linear-gradient(to right, 
        var(--secondary) 0%, 
        var(--secondary) var(--value-percent, 50%), 
        rgba(var(--primary-rgb), 0.3) var(--value-percent, 50%), 
        rgba(var(--primary-rgb), 0.3) 100%
      );
    }
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 10px var(--primary), 0 0 20px var(--primary), 0 0 40px var(--primary);
    }
    50% {
      box-shadow: 0 0 15px var(--primary), 0 0 30px var(--primary), 0 0 60px var(--primary);
    }
    100% {
      box-shadow: 0 0 10px var(--primary), 0 0 20px var(--primary), 0 0 40px var(--primary);
    }
  }
`;

const AmbientScreen = ({ currentTheme, currentSong, onExit, isPlaying, togglePlayPause, AudioPlayer }) => {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const [audioSensitivity, setAudioSensitivity] = useState(1);
  const [audioLevels, setAudioLevels] = useState({ bass: 0, mid: 0, treble: 0 });
  const [gradientColors, setGradientColors] = useState(['#000000', '#000000', '#000000', '#000000']);
  const sliderRef = useRef(null);

  // Generamos colores dinámicos basados en los niveles de audio
  const dynamicColors = useMemo(() => {
    const baseColor = generateDynamicColors(audioLevels.bass, audioLevels.mid, audioLevels.treble);
    return [
      baseColor,
      generateDynamicColors(audioLevels.treble, audioLevels.bass, audioLevels.mid),
      generateDynamicColors(audioLevels.mid, audioLevels.treble, audioLevels.bass),
      generateDynamicColors(1 - audioLevels.bass, 1 - audioLevels.mid, 1 - audioLevels.treble)
    ];
  }, [audioLevels]);

  // Efecto para animar los colores del gradiente
  useEffect(() => {
    let animationFrameId;
    let startTime = Date.now();

    const animateGradient = () => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000; // tiempo en segundos

      const interpolatedColors = dynamicColors.map((targetColor, index) => {
        const startColor = gradientColors[index];
        const r = parseInt(startColor.slice(1, 3), 16);
        const g = parseInt(startColor.slice(3, 5), 16);
        const b = parseInt(startColor.slice(5, 7), 16);

        const targetR = parseInt(targetColor.slice(4, -1).split(',')[0]);
        const targetG = parseInt(targetColor.slice(4, -1).split(',')[1]);
        const targetB = parseInt(targetColor.slice(4, -1).split(',')[2]);

        const newR = Math.round(r + (targetR - r) * Math.min(elapsedTime, 1));
        const newG = Math.round(g + (targetG - g) * Math.min(elapsedTime, 1));
        const newB = Math.round(b + (targetB - b) * Math.min(elapsedTime, 1));

        return `rgb(${newR}, ${newG}, ${newB})`;
      });

      setGradientColors(interpolatedColors);

      if (elapsedTime < 1) {
        animationFrameId = requestAnimationFrame(animateGradient);
      }
    };

    animationFrameId = requestAnimationFrame(animateGradient);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dynamicColors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }
    glRef.current = gl;

    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;
      
      vec3 palette( float t ) {
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.263,0.416,0.557);
        return a + b*cos( 6.28318*(c*t+d) );
      }
      
      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
        vec2 uv0 = uv;
        vec3 finalColor = vec3(0.0);
        
        for (float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * 1.5) - 0.5;
          
          float d = length(uv) * exp(-length(uv0));
          
          vec3 col = palette(length(uv0) + i*.4 + u_time*.4);
          
          d = sin(d*8. + u_time)/8.;
          d = abs(d);
          
          d = pow(0.01 / d, 1.2);
          
          finalColor += col * d;
        }
        
        finalColor *= vec3(u_bass, u_mid, u_treble);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    programRef.current = program;

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1, -1,
      1, -1,
      -1, 1,
      1, 1,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    let startTime = Date.now();

    const render = () => {
      if (!canvasRef.current) return;

      const gl = glRef.current;
      const program = programRef.current;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);

      gl.useProgram(program);

      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

      const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
      const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      gl.uniform1f(timeUniformLocation, (Date.now() - startTime) * 0.001);

      if (analyserRef.current) {
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);

        const bass = dataArray.slice(0, 10).reduce((a, b) => a + b) / 2550 * audioSensitivity;
        const mid = dataArray.slice(10, 100).reduce((a, b) => a + b) / 23040 * audioSensitivity;
        const treble = dataArray.slice(100, 255).reduce((a, b) => a + b) / 39680 * audioSensitivity;

        setAudioLevels({ bass, mid, treble });

        const bassUniformLocation = gl.getUniformLocation(program, 'u_bass');
        const midUniformLocation = gl.getUniformLocation(program, 'u_mid');
        const trebleUniformLocation = gl.getUniformLocation(program, 'u_treble');

        gl.uniform1f(bassUniformLocation, bass);
        gl.uniform1f(midUniformLocation, mid);
        gl.uniform1f(trebleUniformLocation, treble);
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      requestAnimationFrame(render);
    };

    render();

    return () => {
      const gl = glRef.current;
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        gl.deleteBuffer(positionBuffer);
      }
    };
  }, [audioSensitivity]);

  useEffect(() => {
    if (isPlaying && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 512;

      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
          sourceRef.current.connect(analyserRef.current);
        })
        .catch(err => console.error('Error accessing microphone:', err));
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    const updateSliderBackground = () => {
      const slider = sliderRef.current;
      if (slider) {
        const min = parseFloat(slider.min);
        const max = parseFloat(slider.max);
        const value = parseFloat(slider.value);
        const percentage = ((value - min) / (max - min)) * 100;
        slider.style.setProperty('--value-percent', `${percentage}%`);
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('input', updateSliderBackground);
      updateSliderBackground(); // Inicializar
    }

    return () => {
      if (slider) {
        slider.removeEventListener('input', updateSliderBackground);
      }
    };
  }, []);

  return (
    <AmbientScreenWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        background: `linear-gradient(-45deg, ${gradientColors[0]}, ${gradientColors[1]}, ${gradientColors[2]}, ${gradientColors[3]})`
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      <div style={{ position: 'absolute', top: 20, left: 20, display: 'flex', gap: '10px' }}>
        <ControlButton onClick={onExit}>
          <X />
        </ControlButton>
        <ControlButton onClick={togglePlayPause}>
          <Music />
        </ControlButton>
      </div>
      <SensitivityControl>
        <label htmlFor="sensitivity-slider">Sensibilidad:</label>
        <input
          ref={sliderRef}
          id="sensitivity-slider"
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          value={audioSensitivity}
          onChange={(e) => setAudioSensitivity(parseFloat(e.target.value))}
        />
      </SensitivityControl>
      {currentSong && (
        <div style={{ position: 'absolute', bottom: 20, left: 20, color: 'white' }}>
          <h2>{currentSong.name}</h2>
          <p>{currentSong.artists}</p>
        </div>
      )}
      {AudioPlayer}
    </AmbientScreenWrapper>
  );
};

export default AmbientScreen;