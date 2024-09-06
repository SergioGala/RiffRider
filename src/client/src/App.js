import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import SongList from './components/SongList';
import Pagination from './components/Pagination';
import Sorting from './components/Sorting';
import LoadingIndicator from './components/LoadingIndicator';
import TechnoLines from './components/TechnoLines';
import PartyMode from './components/PartyMode';
import GlitchText from './components/GlitchText';
import SuggestionQueue from './components/SuggestionQueue';
import DjInterface from './components/DjInterface';
import AudioPlayer from './components/AudioPlayer';
import AudioVisualizer from './components/AudioVisualizer';
import InternetConnectionCheck from './components/InternetConnectionCheck';
import { submitSongRequest, getRequestQueue } from './services/SongRequestService';
import { authorizeSpotify, setAccessToken, searchTracks } from './services/SpotifyService';
import { themes } from './components/themes';
import './App.css';
import './animations.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [songs, setSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage] = useState(10);
  const [sortCriteria, setSortCriteria] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isLoading, setIsLoading] = useState(false);
  const [isPartyMode, setIsPartyMode] = useState(false);
  const [userId] = useState(() => 'user_' + Math.random().toString(36).substr(2, 9));
  const [requestQueue, setRequestQueue] = useState([]);
  const [isDjMode, setIsDjMode] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('pop');
  const [showAllThemes, setShowAllThemes] = useState(false);

  useEffect(() => {
    const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce((initial, item) => {
        if (item) {
          var parts = item.split('=');
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});

    if (hash.access_token) {
      setSpotifyToken(hash.access_token);
      setAccessToken(hash.access_token);
      window.location.hash = '';
    }

    const fetchRequestQueue = async () => {
      const queue = await getRequestQueue();
      setRequestQueue(queue);
    };

    fetchRequestQueue();
    const queueInterval = setInterval(fetchRequestQueue, 30000);

    return () => {
      clearInterval(queueInterval);
    };
  }, []);

  useEffect(() => {
    const theme = themes[currentTheme];
    Object.keys(theme).forEach(key => {
      document.documentElement.style.setProperty(`--${key}`, theme[key]);
    });
    document.body.classList.add('theme-transition');
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 300);

    // Dispatch a custom event for theme change
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: currentTheme } }));
  }, [currentTheme]);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      console.log('Search term is empty, not performing search.');
      setSongs([]);
      setIsLoading(false);
      return;
    }
    if (spotifyToken) {
      setIsLoading(true);
      try {
        console.log('Initiating search with term:', term);
        const results = await searchTracks(term);
        console.log('Results received in App.js:', JSON.stringify(results, null, 2));
        if (Array.isArray(results) && results.length > 0) {
          setSongs(results);
          setCurrentPage(1);
        } else {
          console.log('No songs found or empty array returned');
          setSongs([]);
        }
      } catch (error) {
        console.error('Error in handleSearch:', error);
        setSongs([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error('No Spotify token available. Please authenticate first.');
    }
  };

  const sortSongs = useCallback((songsToSort, criteria, order) => {
    return [...songsToSort].sort((a, b) => {
      let valueA, valueB;

      switch (criteria) {
        case 'name':
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
          break;
        case 'artists':
          valueA = a.artists.toLowerCase();
          valueB = b.artists.toLowerCase();
          break;
        case 'album':
          valueA = a.album.toLowerCase();
          valueB = b.album.toLowerCase();
          break;
        default:
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
      }

      if (valueA < valueB) return order === 'asc' ? -1 : 1;
      if (valueA > valueB) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, []);

  const sortedSongs = useCallback(() => {
    return sortSongs(songs, sortCriteria, sortOrder);
  }, [songs, sortCriteria, sortOrder, sortSongs]);

  const getCurrentSongs = useCallback(() => {
    const indexOfLastSong = currentPage * songsPerPage;
    const indexOfFirstSong = indexOfLastSong - songsPerPage;
    return sortedSongs().slice(indexOfFirstSong, indexOfLastSong);
  }, [currentPage, songsPerPage, sortedSongs]);

  const totalPages = Math.ceil(sortedSongs().length / songsPerPage);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  const handleSuggestSong = async (song) => {
    try {
      const request = {
        songTitle: song.name,
        artistName: song.artists,
        album: song.album,
        album_image: song.album_image
      };
      await submitSongRequest(request, userId);
      const updatedQueue = await getRequestQueue();
      setRequestQueue(updatedQueue);
    } catch (error) {
      console.error('Error suggesting song:', error);
    }
  };

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const closeAudioPlayer = () => {
    setCurrentSong(null);
    setIsPlaying(false);
  };

  const changeTheme = (genre) => {
    setCurrentTheme(genre);
    setShowAllThemes(false);
  };

  return (
    <div className="App fade-in" style={{ backgroundColor: `var(--background)`, color: `var(--text)` }}>
      <InternetConnectionCheck />
      <TechnoLines />
      <PartyMode isActive={isPartyMode} />
      <h1 className="app-title"><GlitchText text="🎧 YouDJ" /></h1>
      <AudioVisualizer />
      <div className="theme-selector">
        <button 
          onClick={() => setShowAllThemes(!showAllThemes)} 
          className="theme-button show-all-themes"
        >
          {showAllThemes ? 'Ocultar temas' : 'Mostrar todos los temas'}
        </button>
        {(showAllThemes ? Object.keys(themes) : Object.keys(themes).slice(0, 5)).map(theme => (
          <button 
            key={theme} 
            onClick={() => changeTheme(theme)} 
            className={`theme-button ${currentTheme === theme ? 'active glow-pulse' : ''}`}
          >
            {theme}
          </button>
        ))}
      </div>
      {!spotifyToken ? (
        <button onClick={authorizeSpotify} className="spotify-auth-button">
          Conectar con Spotify
        </button>
      ) : (
        <>
          <button onClick={() => setIsPartyMode(!isPartyMode)} className="party-mode-toggle">
            {isPartyMode ? 'Desactivar' : 'Activar'} Modo Fiesta
          </button>
          <button onClick={() => setIsDjMode(!isDjMode)} className="dj-mode-toggle">
            {isDjMode ? 'Modo Usuario' : 'Modo DJ'}
          </button>
          {isDjMode ? (
            <DjInterface 
              currentSong={currentSong} 
              onPlaySong={playSong}
              requestQueue={requestQueue}
              setRequestQueue={setRequestQueue}
            />
          ) : (
            <>
              <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearch} />
              <Sorting 
                sortCriteria={sortCriteria} 
                setSortCriteria={setSortCriteria}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
              {isLoading ? (
                <LoadingIndicator />
              ) : (
                sortedSongs().length > 0 && (
                  <>
                    <SongList 
                      songs={getCurrentSongs()} 
                      onPlaySong={playSong} 
                      onSuggestSong={handleSuggestSong}
                    />
                    <Pagination 
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </>
                )
              )}
              <SuggestionQueue userId={userId} />
            </>
          )}
          {currentSong && (
            <AudioPlayer 
              audioSrc={currentSong.preview_url}
              songTitle={currentSong.name}
              artistName={currentSong.artists}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              onClose={closeAudioPlayer}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;