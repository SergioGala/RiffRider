import React, { useState, useEffect } from 'react';
import { getVotingQueue, submitVote } from '../services/VotingService';

const VotingScreen = ({ userId }) => {
  const [votingQueue, setVotingQueue] = useState([]);

  useEffect(() => {
    const fetchVotingQueue = async () => {
      const queue = await getVotingQueue();
      setVotingQueue(queue);
    };

    fetchVotingQueue();
    const interval = setInterval(fetchVotingQueue, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleVote = async (songId, voteType) => {
    try {
      const { updatedSong } = await submitVote(userId, songId, voteType);
      setVotingQueue(prevQueue => {
        const newQueue = prevQueue.map(song => 
          song.id === songId ? updatedSong : song
        );
        return newQueue.sort((a, b) => b.votes - a.votes);
      });
    } catch (error) {
      console.error('Error al votar:', error);
      // Aquí puedes mostrar un mensaje de error al usuario
    }
  };

  const renderTrendIndicator = (trend) => {
    if (trend > 0) return <span className="trend-up">↑</span>;
    if (trend < 0) return <span className="trend-down">↓</span>;
    return <span className="trend-neutral">−</span>;
  };

  return (
    <div className="voting-screen">
      <h2>Vota por las canciones</h2>
      <ul className="voting-queue">
        {votingQueue.map((song) => (
          <li key={song.id} className="voting-item">
            <div className="song-info">
              <span className="song-title">{song.title}</span>
              <span className="song-artist">{song.artist}</span>
            </div>
            <div className="vote-count">
              {renderTrendIndicator(song.trend)}
              {song.votes}
            </div>
            <div className="vote-buttons">
              <button 
                onClick={() => handleVote(song.id, 'upvote')}
                disabled={song.userVoted}
                className={song.userVoted ? 'voted' : ''}
              >
                👍
              </button>
              <button 
                onClick={() => handleVote(song.id, 'downvote')}
                disabled={song.userVoted}
                className={song.userVoted ? 'voted' : ''}
              >
                👎
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VotingScreen;