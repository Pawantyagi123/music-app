import React from 'react'

export default function SongList({  songs, onSongSelect  }) {
  return (
    <div className="song-list">
    <ul>
      {songs.map(song => (
        <li key={song.id} onClick={() => onSongSelect(song)}>
          <img src={song.image} alt={song.title} width="50" className='listimg'/>
          <h3>{song.title}</h3> 
           Song by {song.artist}
          
        </li>
      ))}
    </ul>
  </div>
  )
}
