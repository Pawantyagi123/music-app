import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import SongList from './Components/SongList';
import Player from './Components/Player';
import Footer from './Components/Footer';
import './App.css';

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isSongListVisible, setIsSongListVisible] = useState(false);
 

  useEffect(() => {
    fetch('/data/songs.json')
      .then(response => response.json())
      .then(data => setSongs(data))
      .catch(error => console.log('Error fetching the songs:', error));
  }, []);

  const handleSongSelect = (selectedSong) => {
    const index = songs.findIndex(song => song.id === selectedSong.id);
    setCurrentSongIndex(index);
  };

  return (
    <div className="app">
      <Header  isSongListVisible={isSongListVisible}
        setIsSongListVisible={setIsSongListVisible}/>
      <div className="content">
        {isSongListVisible && (
          <SongList songs={songs} handleSongSelect={handleSongSelect}/>
        )}
        <Player
          songs={songs}
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          isSongListVisible={isSongListVisible}
          setIsSongListVisible={setIsSongListVisible}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;

