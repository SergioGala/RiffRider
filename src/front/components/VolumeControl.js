import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Minus, Plus } from "lucide-react";

const VolumeControl = ({ primaryColor, secondaryColor, accentColor }) => {
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        document.querySelectorAll("audio").forEach(audio => {
            audio.volume = isMuted ? 0 : volume;
        });
    }, [volume, isMuted]);

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setIsMuted(false);
    };

    const handleMuteToggle = () => {
        setIsMuted(!isMuted);
    };

    const incrementVolume = () => {
        setVolume(prev => Math.min(1, prev + 0.1));
        setIsMuted(false);
    };

    const decrementVolume = () => {
        setVolume(prev => Math.max(0, prev - 0.1));
        setIsMuted(false);
    };

    return (
        <div 
            className={`volume-control-wrapper ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                '--primary-color': primaryColor,
                '--secondary-color': secondaryColor,
                '--accent-color': accentColor
            }}
        >
            <button 
                onClick={handleMuteToggle}
                className="mute-button"
                aria-label={isMuted ? "Unmute" : "Mute"}
            >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
            <button onClick={decrementVolume} className="volume-adjust-button">
                <Minus size={16} />
            </button>
            <div className="slider-container">
                <input 
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                    aria-label="Volume"
                />
                <div 
                    className="volume-level" 
                    style={{width: `${(isMuted ? 0 : volume) * 100}%`}}
                />
            </div>
            <button onClick={incrementVolume} className="volume-adjust-button">
                <Plus size={16} />
            </button>
            <div className="volume-visualization">
                {[...Array(5)].map((_, index) => (
                    <div 
                        key={index} 
                        className="volume-bar"
                        style={{
                            height: `${Math.min(100, (volume * 100 * (index + 1) / 5))}%`,
                            opacity: isMuted ? 0.2 : 1
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default VolumeControl;