let votingQueue = [];

export const getVotingQueue = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...votingQueue]);
    }, 500);
  });
};

export const submitVote = async (userId, songId, voteType) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const songIndex = votingQueue.findIndex(song => song.id === songId);
      if (songIndex === -1) {
        reject(new Error('Canción no encontrada'));
        return;
      }

      if (votingQueue[songIndex].userVoted && votingQueue[songIndex].userVoted[userId]) {
        reject(new Error('Ya has votado por esta canción'));
        return;
      }

      const voteChange = voteType === 'upvote' ? 1 : -1;
      votingQueue[songIndex] = {
        ...votingQueue[songIndex],
        votes: (votingQueue[songIndex].votes || 0) + voteChange,
        trend: voteChange,
        userVoted: { ...votingQueue[songIndex].userVoted, [userId]: true }
      };

      resolve({ success: true, updatedSong: votingQueue[songIndex] });
    }, 500);
  });
};

export const addToVotingQueue = async (song) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const existingSong = votingQueue.find(s => s.id === song.id);
      if (!existingSong) {
        const newSong = {
          id: song.id,
          songTitle: song.songTitle || song.name,
          artistName: song.artistName || song.artists,
          album: song.album,
          album_image: song.album_image,
          votes: 0,
          trend: 0,
          userVoted: {}
        };
        votingQueue.push(newSong);
        resolve({ success: true, addedSong: newSong });
      } else {
        resolve({ success: false, message: 'La canción ya está en la cola de votación' });
      }
    }, 500);
  });
};