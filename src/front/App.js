import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import SearchBar from './components/SearchBar';
import SongList from './components/SongList';
import Pagination from './components/Pagination';
import Sorting from './components/Sorting';
import AmbientScreen from './components/AmbientScreen';
import LoadingIndicator from './components/LoadingIndicator';
import TechnoLines from './components/TechnoLines';
import PartyMode from './components/PartyMode';
import GlitchText from './components/GlitchText';
import SuggestionQueue from './components/SuggestionQueue';
import DjInterface from './components/DjInterface';
import AudioPlayer from './components/AudioPlayer';
import AudioVisualizer from './components/AudioVisualizer';
import InternetConnectionCheck from './components/InternetConnectionCheck';
import ThemeCarousel from './components/ThemeCarousel';
import DynamicTheme from './components/DynamicTheme';
import Register from './components/Register';
import Login from './components/Login';
import { submitSongRequest, getRequestQueue } from './services/SongRequestService';
import { authorizeSpotify, setAccessToken, searchTracks } from './services/SpotifyService';
import { themes } from './components/themes';
import { LogIn, UserPlus,  Headphones, Music, Disc, LogOut, Sun, Moon } from 'lucide-react';
import './App.css';
import './animations.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [songs, setSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage] = useState(10);
  const [sortCriteria, setSortCriteria] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isLoading, setIsLoading] = useState(false);
  const [isPartyMode, setIsPartyMode] = useState(false);
  const [userId, setUserId] = useState(null);
  const [requestQueue, setRequestQueue] = useState([]);
  const [isDjMode, setIsDjMode] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [currentTheme, setCurrentTheme] = useState({
    name: 'pop',
    mode: 'light',
    ...themes.pop.light
  });
  const [isDynamicThemeEnabled, setIsDynamicThemeEnabled] = useState(false);
  const [currentAlbumCover, setCurrentAlbumCover] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAuthForms, setShowAuthForms] = useState(false);
  const [isAmbientMode, setIsAmbientMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const togglePlayPause = useCallback(() => {
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
  }, []);

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
    if (currentTheme && currentTheme.name && themes[currentTheme.name]) {
      const themeData = themes[currentTheme.name][currentTheme.mode];
      if (themeData) {
        Object.keys(themeData).forEach(key => {
          document.documentElement.style.setProperty(`--${key}`, themeData[key]);
        });
  
        document.body.style.backgroundColor = themeData.background || '';
        document.body.style.backgroundImage = themeData.pattern || 'none';
        
        document.body.classList.add('theme-transition');
        setTimeout(() => {
          document.body.classList.remove('theme-transition');
        }, 300);
  
        const oldStyle = document.getElementById('theme-animations');
        if (oldStyle) {
          oldStyle.remove();
        }
  
        if (themeData.animation && themeData.animation.name) {
          const style = document.createElement('style');
          style.id = 'theme-animations';
          style.textContent = `
            ${themeData.animation.keyframes}
            .animated-element {
              animation: ${themeData.animation.name} 2s infinite;
            }
          `;
          document.head.appendChild(style);
        }
  
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: currentTheme.name } }));
      }
    }
  
    return () => {
      const styleToRemove = document.getElementById('theme-animations');
      if (styleToRemove) {
        styleToRemove.remove();
      }
    };
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

  const handleLogin = useCallback((userData) => {
    setIsLoggedIn(true);
    setUserId(userData.id);
    setShowAuthForms(false);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  const handleBackToApp = useCallback(() => {
    setShowAuthForms(false);
  }, []);

  const toggleAmbientMode = useCallback(() => {
    setIsAmbientMode(prev => !prev);
  }, []);

  useEffect(() => {
    const closeMenu = (e) => {
      if (isMenuOpen && !e.target.closest('.menu-container')) {
        setIsMenuOpen(false);
      }
    };
  
    document.addEventListener('click', closeMenu);
  
    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, [isMenuOpen]);

 return (
    <motion.div 
      className="App fade-in"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        fontFamily: currentTheme.font,
        color: currentTheme.text
      }}
    >
      <InternetConnectionCheck />
      <TechnoLines />
      <PartyMode isActive={isPartyMode} />
      
      <header className="app-header animated-element">
        <GlitchText text="🎧 YouDJ" />
        <nav className="app-nav">
          <button onClick={() => { setShowRegister(false); setShowAuthForms(true); }} title="Iniciar Sesión">
            <LogIn />
          </button>
          <button onClick={() => { setShowRegister(true); setShowAuthForms(true); }} title="Registrarse">
            <UserPlus />
          </button>
          <button onClick={authorizeSpotify} title="Conectar con Spotify">
            <Headphones />
          </button>
          <button onClick={() => setIsPartyMode(!isPartyMode)} title={isPartyMode ? 'Desactivar Modo Fiesta' : 'Activar Modo Fiesta'}>
            <Music />
          </button>
          <button onClick={() => setIsDjMode(!isDjMode)} title={isDjMode ? 'Modo Usuario' : 'Modo DJ'}>
            <Disc />
          </button>
          <button onClick={handleLogout} title="Cerrar Sesión">
            <LogOut />
          </button>
          <button onClick={toggleAmbientMode} title={isAmbientMode ? 'Salir de Modo Ambiente' : 'Entrar en Modo Ambiente'}>
            {isAmbientMode ? <Sun /> : <Moon />}
          </button>
        </nav>
      </header>

      <main className="app-main">
      {isAmbientMode ? (
  <AmbientScreen 
    currentTheme={currentTheme}
    currentSong={currentSong}
    onExit={toggleAmbientMode}
    isPlaying={isPlaying}
    togglePlayPause={togglePlayPause}
    AudioPlayer={
      <AudioPlayer 
        audioSrc={currentSong?.preview_url}
        songTitle={currentSong?.name}
        artistName={currentSong?.artists}
        albumCover={currentSong?.album_image}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onClose={closeAudioPlayer}
        primaryColor={currentTheme.primary}
        secondaryColor={currentTheme.secondary}
        className="animated-element"
      />
    }
  />
        ) : showAuthForms ? (
          showRegister ? (
            <Register onRegisterSuccess={handleLogin} onBackToApp={handleBackToApp} />
          ) : (
            <Login onLoginSuccess={handleLogin} onBackToApp={handleBackToApp} />
          )
        ) : (
          <>
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
          </>
        )}
      </main>
      
      {!isAmbientMode && (
        <>
          <DynamicTheme 
            albumCover={currentAlbumCover}
            isEnabled={isDynamicThemeEnabled}
          />
          <ThemeCarousel
            currentTheme={currentTheme}
            setCurrentTheme={setCurrentTheme}
            isDynamicThemeEnabled={isDynamicThemeEnabled}
            setIsDynamicThemeEnabled={setIsDynamicThemeEnabled}
          />

          <AudioVisualizer className="animated-element" />

          {currentSong && (
            <AudioPlayer 
              audioSrc={currentSong.preview_url}
              songTitle={currentSong.name}
              artistName={currentSong.artists}
              albumCover={currentSong.album_image}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              onClose={closeAudioPlayer}
              primaryColor={currentTheme.primary}
              secondaryColor={currentTheme.secondary}
              className="animated-element"
            />
          )}
        </>
      )}
    </motion.div>
  );
}

export default App;