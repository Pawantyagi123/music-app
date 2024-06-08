import React from 'react'
import {FaList } from "react-icons/fa";
export default function Header({isSongListVisible, setIsSongListVisible}) {

  const toggleSongList = () => {
    setIsSongListVisible(!isSongListVisible);
};
  return (
    <header className="app-header">
       <button onClick={toggleSongList}><FaList /></button>
       <div className="text"><h1>Shadow Music</h1></div>
      
    </header>
  )
}
