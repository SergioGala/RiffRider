import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';


const AudioPlayer = ({ audioSrc, songTitle, artistName, albumCover, isPlaying, setIsPlaying, onClose, primaryColor, secondaryColor }) =>  {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
      const handleLoadedMetadata = () => setDuration(audio.duration);
      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [setIsPlaying]);

  useEffect(() => {
    if (audioRef.current && audioSrc) {
      audioRef.current.src = audioSrc;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      }
      setCurrentTime(0);
    }
  }, [audioSrc, isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!audioSrc) {
    return null;
  }

  return (
    <div className="audio-player-futuristic" style={{
      '--player-primary': primaryColor,
      '--player-secondary': secondaryColor,
      
    }}>
      <div className="holographic-display">
        <div className="song-info-hologram">
          <h3>{songTitle}</h3>
          <p>{artistName}</p>
        </div>
        <div className="visualizer">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="visualizer-bar"
              style={{
                height: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>
      <div className="controls-panel">
        <button onClick={() => audioRef.current.currentTime -= 10} className="control-button">
          <SkipBack />
        </button>
        <button onClick={togglePlay} className="play-pause-button">
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <button onClick={() => audioRef.current.currentTime += 10} className="control-button">
          <SkipForward />
        </button>
      </div>
      <div className="progress-container">
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="progress-slider"
        />
        <span>{formatTime(duration)}</span>
      </div>
      <div className="volume-container">
        <button onClick={toggleMute} className="volume-button">
          {isMuted ? <VolumeX /> : <Volume2 />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>
      <div className="hologram-effect"></div>
      <button onClick={onClose} className="close-button">X</button>
      <audio ref={audioRef} />
    </div>
  );
};

export default AudioPlayer;
