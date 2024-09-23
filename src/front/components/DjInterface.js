import React, { useState, useEffect } from 'react';
import { updateRequestStatus, getRequestQueue } from '../services/SongRequestService';
import { addToVotingQueue } from '../services/VotingService';
import './DjInterface.css';

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
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="dj-interface">
      <h2>Interfaz del DJ</h2>
      <div className="current-song">
        <h3>Reproduciendo ahora:</h3>
        {currentSong ? (
          <div className="current-song-info">
            <img src={currentSong.album_image} alt={currentSong.album} className="song-image" />
            <div>
              <p className="song-title">{currentSong.name}</p>
              <p className="song-artist">{currentSong.artists}</p>
            </div>
          </div>
        ) : (
          <p>No hay canción en reproducción</p>
        )}
      </div>
      <div className="request-queue">
        <h3>Cola de solicitudes:</h3>
        {localRequestQueue.length === 0 ? (
          <p>No hay solicitudes pendientes</p>
        ) : (
          <ul className="request-list">
            {localRequestQueue.map(request => (
              <li key={request.id} className="request-item">
                <img src={request.album_image} alt={request.album} className="request-image" />
                <div className="request-info">
                  <p className="request-title">{request.songTitle}</p>
                  <p className="request-artist">{request.artistName}</p>
                  <p className="request-album">{request.album}</p>
                </div>
                <div className="request-actions">
                  <button onClick={() => handleAcceptRequest(request)} className="accept-button">Aceptar</button>
                  <button onClick={() => handleRejectRequest(request.id)} className="reject-button">Rechazar</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DjInterface;

