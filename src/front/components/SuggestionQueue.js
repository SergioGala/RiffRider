import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { getVotingQueue, submitVote } from '../services/VotingService';
import { ThumbsUp, ThumbsDown, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const QueueContainer = styled.div`
  background-color: var(--background);
  border: 2px solid var(--primary);
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
`;

const Title = styled.h2`
  color: var(--primary);
  text-align: center;
  margin-bottom: 20px;
`;

const SuggestionList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SuggestionItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(var(--primary-rgb), 0.1);
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(var(--primary-rgb), 0.2);
  }
`;

const QueuePosition = styled.span`
  color: var(--secondary);
  font-weight: bold;
  margin-right: 10px;
`;

const SongInfo = styled.div`
  flex-grow: 1;
`;

const SongTitle = styled.span`
  color: var(--primary);
  font-weight: bold;
  margin-right: 10px;
`;

const SongArtist = styled.span`
  color: var(--secondary);
`;

const VoteCount = styled.div`
  color: var(--accent);
  font-weight: bold;
  margin: 0 20px;
  display: flex;
  align-items: center;
`;

const VoteButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const VoteButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  padding: 5px;
  transition: all 0.3s ease;
  color: var(--text);

  &:hover {
    transform: scale(1.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.voted {
    color: var(--primary);
  }
`;

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
    if (trend > 0) return <TrendingUp color="var(--primary)" />;
    if (trend < 0) return <TrendingDown color="var(--error)" />;
    return <Minus color="var(--accent)" />;
  }, []);

  return (
    <QueueContainer>
      <Title>Cola de Sugerencias</Title>
      {suggestions.length === 0 ? (
        <p>No hay sugerencias en la cola</p>
      ) : (
        <SuggestionList>
          {suggestions.map((song, index) => (
            <SuggestionItem key={song.id}>
              <QueuePosition>{index + 1}</QueuePosition>
              <SongInfo>
                <SongTitle>{song.songTitle}</SongTitle>
                <SongArtist>{song.artistName}</SongArtist>
              </SongInfo>
              <VoteCount>
                {renderTrendIndicator(song.trend)}
                {song.votes}
              </VoteCount>
              <VoteButtons>
                <VoteButton 
                  onClick={() => handleVote(song.id, 'upvote')}
                  disabled={song.userVoted && song.userVoted[userId]}
                  className={song.userVoted && song.userVoted[userId] ? 'voted' : ''}
                  aria-label="Votar positivamente"
                >
                  <ThumbsUp />
                </VoteButton>
                <VoteButton 
                  onClick={() => handleVote(song.id, 'downvote')}
                  disabled={song.userVoted && song.userVoted[userId]}
                  className={song.userVoted && song.userVoted[userId] ? 'voted' : ''}
                  aria-label="Votar negativamente"
                >
                  <ThumbsDown />
                </VoteButton>
              </VoteButtons>
            </SuggestionItem>
          ))}
        </SuggestionList>
      )}
    </QueueContainer>
  );
};

export default SuggestionQueue;