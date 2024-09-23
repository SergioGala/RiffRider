import React from 'react';

function SongItem({ song }) {
  return (
    <li className="song-item">
      <div className="song-info">
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
      </div>
      <span className="song-genre">{song.genre}</span>
      <button className="request-button">Solicitar</button>
    </li>
  );
}

export default SongItem;