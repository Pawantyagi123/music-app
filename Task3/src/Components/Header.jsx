import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
export default function Header({isSongListVisible, setIsSongListVisible}) {

  const toggleSongList = () => {
    setIsSongListVisible(!isSongListVisible);
};
  return (
    <header className="app-header">
       <button onClick={toggleSongList}>{!isSongListVisible ? <RxHamburgerMenu/> : <IoCloseSharp/>}</button>
       <div className="text"><h1>Shadow Music</h1></div>
      
    </header>
  )
}
