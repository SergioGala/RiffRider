import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

export const authorizeSpotify = () => {
  const scopes = [
    'user-read-private',
    'user-read-email',
    'user-read-playback-state',
    'user-modify-playback-state',
    'streaming'
  ];

  const url = `https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
  window.location.href = url;
};

export const setAccessToken = (token) => {
  console.log('Setting access token:', token);
  if (token) {
    spotifyApi.setAccessToken(token);
  } else {
    console.error('No token provided to setAccessToken');
  }
};

export const searchTracks = async (query) => {
  if (!spotifyApi.getAccessToken()) {
    console.error('No access token set. Please authenticate first.');
    throw new Error('No access token set. Please authenticate first.');
  }
  if (!query.trim()) {
    console.error('Empty search query');
    return [];
  }
  try {
    console.log('Searching tracks with query:', query);
    const response = await spotifyApi.searchTracks(query, { limit: 20 });
    console.log('Raw Spotify API response:', JSON.stringify(response, null, 2));
    
    if (response && response.tracks && Array.isArray(response.tracks.items)) {
      const formattedResults = response.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artists: track.artists.map(artist => artist.name).join(', '),
        album: track.album.name,
        preview_url: track.preview_url,
        album_image: track.album.images[0]?.url
      }));
      console.log('Formatted results:', JSON.stringify(formattedResults, null, 2));
      return formattedResults;
    } else {
      console.error('Unexpected response structure:', JSON.stringify(response, null, 2));
      return [];
    }
  } catch (error) {
    console.error('Error searching tracks:', error);
    if (error.status === 401) {
      console.error('Unauthorized: Token may have expired');
    }
    throw error;
  }
};
export const getTrack = async (trackId) => {
  try {
    return await spotifyApi.getTrack(trackId);
  } catch (error) {
    console.error('Error getting track:', error);
    return null;
  }
};

export const playTrack = async (trackUri) => {
  try {
    await spotifyApi.play({ uris: [trackUri] });
  } catch (error) {
    console.error('Error playing track:', error);
  }
};

export const pausePlayback = async () => {
  try {
    await spotifyApi.pause();
  } catch (error) {
    console.error('Error pausing playback:', error);
  }
};

export const resumePlayback = async () => {
  try {
    await spotifyApi.play();
  } catch (error) {
    console.error('Error resuming playback:', error);
  }
};

export const skipToNext = async () => {
  try {
    await spotifyApi.skipToNext();
  } catch (error) {
    console.error('Error skipping to next track:', error);
  }
};

export const skipToPrevious = async () => {
  try {
    await spotifyApi.skipToPrevious();
  } catch (error) {
    console.error('Error skipping to previous track:', error);
  }
};