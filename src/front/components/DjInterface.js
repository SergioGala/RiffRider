import React, { useState, useEffect } from 'react';
import { updateRequestStatus, getRequestQueue } from '../services/SongRequestService';
import { addToVotingQueue } from '../services/VotingService';
import styled from 'styled-components';

const DjInterfaceWrapper = styled.div`
  background-color: var(--background);
  border: 2px solid var(--primary);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 30px;
  color: var(--text);
`;

const Title = styled.h2`
  color: var(--primary);
  text-align: center;
  margin-bottom: 25px;
  text-shadow: 0 0 10px var(--primary);
`;

const CurrentSong = styled.div`
  background-color: rgba(var(--primary-rgb), 0.1);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 25px;
  border: 1px solid var(--primary);
`;

const SongInfo = styled.div`
  display: flex;
  align-items: center;
`;

const SongImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 10px;
  border: 2px solid var(--primary);
`;

const SongTitle = styled.h3`
  color: var(--primary);
  font-size: 1.4em;
  margin: 0;
  text-shadow: 0 0 5px var(--primary);
`;

const SongArtist = styled.p`
  color: var(--secondary);
  font-size: 1.1em;
  margin: 5px 0;
`;

const RequestList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const RequestItem = styled.li`
  background-color: rgba(var(--secondary-rgb), 0.1);
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  border: 1px solid var(--secondary);

  &:hover {
    background-color: rgba(var(--secondary-rgb), 0.2);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(var(--secondary-rgb), 0.3);
  }
`;

const RequestImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
  border: 2px solid var(--secondary);
`;

const RequestInfo = styled.div`
  flex-grow: 1;
`;

const RequestTitle = styled.h4`
  color: var(--primary);
  font-weight: bold;
  margin: 0;
  font-size: 1.2em;
`;

const RequestArtist = styled.p`
  color: var(--secondary);
  margin: 5px 0;
`;

const RequestAlbum = styled.p`
  color: var(--text);
  font-size: 0.9em;
  margin: 0;
`;

const RequestActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
`;

const ActionButton = styled.button`
  background-color: var(--primary);
  color: var(--background);
  border: none;
  padding: 12px 24px;
  border-radius: 30px;
  cursor: pointer;
  margin: 5px;
  transition: all 0.3s ease;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 0 15px var(--primary);
  font-size: 1em;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 20px var(--primary);
  }
`;

const AcceptButton = styled(ActionButton)`
  background-color: var(--primary);
`;

const RejectButton = styled(ActionButton)`
  background-color: var(--error);
  color: var(--text);
`;

const DjInterface = ({ currentSong, onPlaySong, setRequestQueue }) => {
  const [error, setError] = useState(null);
  const [localRequestQueue, setLocalRequestQueue] = useState([]);

  useEffect(() => {
    const fetchQueue = async () => {
      const queue = await getRequestQueue();
      setLocalRequestQueue(queue);
      setRequestQueue(queue);
    };

    fetchQueue();
    const interval = setInterval(fetchQueue, 10000);
    return () => clearInterval(interval);
  }, [setRequestQueue]);

  const handleAcceptRequest = async (request) => {
    try {
      await updateRequestStatus(request.id, 'accepted');
      await addToVotingQueue(request);
      setLocalRequestQueue(prevQueue => prevQueue.filter(req => req.id !== request.id));
      setRequestQueue(prevQueue => prevQueue.filter(req => req.id !== request.id));
      setError(null);
    } catch (err) {
      console.error('Error accepting request:', err);
      setError(`Error al aceptar la solicitud: ${err.message}`);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await updateRequestStatus(requestId, 'rejected');
      setLocalRequestQueue(prevQueue => prevQueue.filter(req => req.id !== requestId));
      setRequestQueue(prevQueue => prevQueue.filter(req => req.id !== requestId));
      setError(null);
    } catch (err) {
      console.error('Error rejecting request:', err);
      setError(`Error al rechazar la solicitud: ${err.message}`);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <DjInterfaceWrapper>
      <Title>Interfaz del DJ</Title>
      <CurrentSong>
        <h3>Reproduciendo ahora:</h3>
        {currentSong ? (
          <SongInfo>
            <SongImage src={currentSong.album_image} alt={currentSong.name} />
            <div>
              <SongTitle>{currentSong.name}</SongTitle>
              <SongArtist>{currentSong.artists}</SongArtist>
            </div>
          </SongInfo>
        ) : (
          <p>No hay canción en reproducción</p>
        )}
      </CurrentSong>
      <div>
        <h3>Cola de solicitudes:</h3>
        {localRequestQueue.length === 0 ? (
          <p>No hay solicitudes pendientes</p>
        ) : (
          <RequestList>
            {localRequestQueue.map(request => (
              <RequestItem key={request.id}>
                <RequestImage src={request.album_image} alt={request.songTitle} />
                <RequestInfo>
                  <RequestTitle>{request.songTitle}</RequestTitle>
                  <RequestArtist>{request.artistName}</RequestArtist>
                  <RequestAlbum>{request.album}</RequestAlbum>
                </RequestInfo>
                <RequestActions>
                  <AcceptButton onClick={() => handleAcceptRequest(request)}>Aceptar</AcceptButton>
                  <RejectButton onClick={() => handleRejectRequest(request.id)}>Rechazar</RejectButton>
                </RequestActions>
              </RequestItem>
            ))}
          </RequestList>
        )}
      </div>
    </DjInterfaceWrapper>
  );
};

export default DjInterface;