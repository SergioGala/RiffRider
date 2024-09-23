import React, { useState } from 'react';

const SongRequestForm = ({ onSubmit }) => {
  const [songTitle, setSongTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ songTitle, artistName, message });
    // Limpiar el formulario después del envío
    setSongTitle('');
    setArtistName('');
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="song-request-form">
      <input
        type="text"
        value={songTitle}
        onChange={(e) => setSongTitle(e.target.value)}
        placeholder="Título de la canción"
        required
      />
      <input
        type="text"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
        placeholder="Nombre del artista"
        required
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Mensaje para el DJ (opcional)"
      />
      <button type="submit">Solicitar Canción</button>
    </form>
  );
};

export default SongRequestForm;