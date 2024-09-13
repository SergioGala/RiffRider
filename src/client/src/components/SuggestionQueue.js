import React, { useState, useEffect, useCallback } from 'react';
import { getVotingQueue, submitVote } from '../services/VotingService';
import './SuggestionQueue.css';

const SuggestionQueue = ({ userId }) => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = useCallback(async () => {
    const votingQueue = await getVotingQueue();
    setSuggestions(votingQueue.sort((a, b) => b.votes - a.votes));
  }, []);

  useEffect(() => {
    fetchSuggestions();
    const interval = setInterval(fetchSuggestions, 10000);
    return () => clearInterval(interval);
  }, [fetchSuggestions]);

  const handleVote = useCallback(async (songId, voteType) => {
    try {
      const { updatedSong } = await submitVote(userId, songId, voteType);
      setSuggestions(prevSuggestions => {
        const newSuggestions = prevSuggestions.map(song => 
          song.id === songId ? { ...song, ...updatedSong } : song
        );
        return newSuggestions.sort((a, b) => b.votes - a.votes);
      });
    } catch (error) {
      console.error('Error al votar:', error);
      // Aquí puedes mostrar un mensaje de error al usuario
    }
  }, [userId]);

  const renderTrendIndicator = useCallback((trend) => {
    if (trend > 0) return <span className="trend-up">↑</span>;
    if (trend < 0) return <span className="trend-down">↓</span>;
    return <span className="trend-neutral">−</span>;
  }, []);

  return (
    <div className="suggestion-queue">
      <h2>Cola de Sugerencias</h2>
      {suggestions.length === 0 ? (
        <p>No hay sugerencias en la cola</p>
      ) : (
        <ul>
          {suggestions.map((song, index) => (
            <li key={song.id} className="suggestion-item">
              <span className="queue-position">{index + 1}</span>
              <div className="song-info">
                <span className="song-title">{song.songTitle}</span>
                <span className="song-artist">{song.artistName}</span>
              </div>
              <div className="vote-count">
                {renderTrendIndicator(song.trend)}
                {song.votes}
              </div>
              <div className="vote-buttons">
                <button 
                  onClick={() => handleVote(song.id, 'upvote')}
                  disabled={song.userVoted && song.userVoted[userId]}
                  className={song.userVoted && song.userVoted[userId] ? 'voted' : ''}
                  aria-label="Votar positivamente"
                >
                  👍
                </button>
                <button 
                  onClick={() => handleVote(song.id, 'downvote')}
                  disabled={song.userVoted && song.userVoted[userId]}
                  className={song.userVoted && song.userVoted[userId] ? 'voted' : ''}
                  aria-label="Votar negativamente"
                >
                  👎
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuggestionQueue;