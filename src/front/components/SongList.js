import React from 'react';
import './SongList.css';

const SongList = ({ songs, onPlaySong, onSuggestSong }) => {
  console.log('Songs received in SongList:', songs);

  const handleImageError = (event) => {
    event.target.src = '/path/to/fallback/image.jpg'; // Reemplaza con la ruta a tu imagen de respaldo
  };

  const openInSpotify = (song) => {
    if (song.uri) {
      window.open(`https://open.spotify.com/track/${song.uri.split(':')[2]}`, '_blank');
    } else if (song.id) {
      window.open(`https://open.spotify.com/track/${song.id}`, '_blank');
    } else {
      console.error('No se pudo abrir la canción en Spotify: falta URI o ID');
    }
  };

  if (!songs || songs.length === 0) {
    return <p className="no-songs-message">No se encontraron canciones. Prueba con otra búsqueda.</p>;
  }

  return (
    <ul className="song-list">
      {songs.map((song) => (
        <li key={song.id} className="song-item">
          <div className="song-image-container">
            {song.album_image && (
              <img 
                src={song.album_image} 
                alt={`${song.album} album cover`} 
                className="album-cover"
                onError={handleImageError}
              />
            )}
          </div>
          <div className="song-info">
            <h3 className="song-name">{song.name}</h3>
            <p className="song-artist">{song.artists}</p>
            <p className="song-album">{song.album}</p>
          </div>
          <div className="song-actions">
            <button 
              onClick={() => onPlaySong(song)} 
              className={`play-button ${!song.preview_url ? 'disabled' : ''}`}
              disabled={!song.preview_url}
              title={song.preview_url ? 'Reproducir previsualización' : 'Previsualización no disponible'}
            >
              ▶
            </button>
            <button 
              onClick={() => openInSpotify(song)} 
              className="open-spotify-button"
              title="Abrir en Spotify"
            >
              Abrir en Spotify
            </button>
            <button 
              onClick={() => onSuggestSong(song)} 
              className="suggest-song-button"
              title="Sugerir al DJ"
            >
              Sugerir al DJ
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SongList;