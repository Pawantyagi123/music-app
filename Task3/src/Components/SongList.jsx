import React from 'react'

export default function SongList({  songs, handleSongSelect  }) {
  return (
    <div className="song-list">
      <h1 style={{padding: "20px"}}>Song List</h1>
    <ul>
      {songs.map(song => (
        <li key={song.id} onClick={() => handleSongSelect(song)}>
          <img src={song.image} alt={song.title} width="50" className='listimg'/>
          <h3>{song.title}</h3> 
          
        </li>
      ))}
    </ul>
  </div>
  )
}
