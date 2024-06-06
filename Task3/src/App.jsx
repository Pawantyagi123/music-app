import Header from './Components/Header'
import SongList from './Components/SongList'
import Player from './Components/Player'
import Footer from './Components/Footer'
import './App.css'
import { useState,useEffect } from 'react'


function App() {
  const [songs, setSongs] = useState([]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  useEffect(() => {
    fetch('/data/songs.json')
      .then(response => response.json())
      .then(data => setSongs(data))
      .catch(error => console.log('Error fetching the songs:', error));
  }, []);
  return (
   <>
  <div className="app">
      <Header />
      <div className="content">
      <SongList songs={songs} setCurrentSongIndex={setCurrentSongIndex} />
        <Player songs={songs} currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex} />
      </div>
      <Footer/>
    </div>
   </>
      
  )
}

export default App
