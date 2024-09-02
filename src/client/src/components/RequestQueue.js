import React from 'react';

const RequestQueue = ({ queue }) => {
  return (
    <div className="request-queue">
      <h2>Cola de Solicitudes</h2>
      {queue.length === 0 ? (
        <p>No hay solicitudes en la cola</p>
      ) : (
        <ul>
          {queue.map((request, index) => (
            <li key={request.id} className="queue-item">
              <span className="queue-position">{index + 1}</span>
              <span className="queue-song">{request.songTitle}</span>
              <span className="queue-artist">{request.artistName}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RequestQueue;