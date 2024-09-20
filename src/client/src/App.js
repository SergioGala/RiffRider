import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
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
import ThemeSelector from './components/ThemeSelector';
import DynamicTheme from './components/DynamicTheme';
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
  const [isDynamicThemeEnabled, setIsDynamicThemeEnabled] = useState(false);
  const [currentAlbumCover, setCurrentAlbumCover] = useState(null);

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

    return () => clearInterval(queueInterval);
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

    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: currentTheme } }));
  }, [currentTheme]);

  const handleSearch = useCallback(async (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setSongs([]);
      setIsLoading(false);
      return;
    }
    if (spotifyToken) {
      setIsLoading(true);
      try {
        const results = await searchTracks(term);
        if (Array.isArray(results) && results.length > 0) {
          setSongs(results);
          setCurrentPage(1);
        } else {
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
  }, [spotifyToken]);

  const sortSongs = useCallback((songsToSort, criteria, order) => {
    return [...songsToSort].sort((a, b) => {
      let valueA = a[criteria]?.toLowerCase();
      let valueB = b[criteria]?.toLowerCase();
      return order === 'asc' 
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
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

  const handleSuggestSong = useCallback(async (song) => {
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
  }, [userId]);

  const playSong = useCallback((song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setCurrentAlbumCover(song.album_image);
  }, []);

  const closeAudioPlayer = useCallback(() => {
    setCurrentSong(null);
    setIsPlaying(false);
  }, []);

  return (
    <motion.div 
    className="App fade-in"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <InternetConnectionCheck />
    <TechnoLines />
    <PartyMode isActive={isPartyMode} />
    
    <header className="app-header">
        <GlitchText text="🎧 YouDJ" />
      </header>

    <nav className="app-nav">
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
        </>
      )}
    </nav>

    <main className="app-main">
      {spotifyToken && !isDjMode && (
        <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearch} />
      )}

        {isDjMode ? (
          <DjInterface 
            currentSong={currentSong} 
            onPlaySong={playSong}
            requestQueue={requestQueue}
            setRequestQueue={setRequestQueue}
          />
        ) : (
          <>
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
      </main>
      <DynamicTheme 
        albumCover={currentAlbumCover}
        isEnabled={isDynamicThemeEnabled}
      />
      <ThemeSelector
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
        isDynamicThemeEnabled={isDynamicThemeEnabled}
        setIsDynamicThemeEnabled={setIsDynamicThemeEnabled}
      />

<AudioVisualizer />

{currentSong && (
  <AudioPlayer 
    audioSrc={currentSong.preview_url}
    songTitle={currentSong.name}
    artistName={currentSong.artists}
    albumCover={currentSong.album_image}
    isPlaying={isPlaying}
    setIsPlaying={setIsPlaying}
    onClose={closeAudioPlayer}
    primaryColor={themes[currentTheme].primary}
    secondaryColor={themes[currentTheme].secondary}
  />
)}
</motion.div>
);
}

export default App;