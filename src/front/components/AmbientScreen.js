import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Music } from 'lucide-react';
import AudioPlayer from './AudioPlayer.js';

const AmbientScreen = ({ currentTheme, currentSong, onExit, isPlaying, togglePlayPause, AudioPlayer }) => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');

    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

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

    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
    const bassUniformLocation = gl.getUniformLocation(program, 'u_bass');
    const midUniformLocation = gl.getUniformLocation(program, 'u_mid');
    const trebleUniformLocation = gl.getUniformLocation(program, 'u_treble');

    let startTime = Date.now();

    const render = () => {
      if (!canvasRef.current) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);

      gl.useProgram(program);

      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      gl.uniform1f(timeUniformLocation, (Date.now() - startTime) * 0.001);

      if (analyserRef.current) {
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);

        const bass = dataArray.slice(0, 10).reduce((a, b) => a + b) / 2550;
        const mid = dataArray.slice(10, 100).reduce((a, b) => a + b) / 23040;
        const treble = dataArray.slice(100, 255).reduce((a, b) => a + b) / 39680;

        gl.uniform1f(bassUniformLocation, bass);
        gl.uniform1f(midUniformLocation, mid);
        gl.uniform1f(trebleUniformLocation, treble);
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      requestAnimationFrame(render);
    };

    render();

    return () => {
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

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

  return (
    <motion.div
      className="ambient-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: '10px' }}>
        <button onClick={onExit} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
          <X size={24} />
        </button>
        <button onClick={togglePlayPause} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
          <Music size={24} />
        </button>
      </div>
      {currentSong && (
        <div style={{ position: 'absolute', bottom: 20, left: 20, color: 'white' }}>
          <h2>{currentSong.name}</h2>
          <p>{currentSong.artists}</p>
        </div>
      )}
      {AudioPlayer}
    </motion.div>
  );
};

export default AmbientScreen;