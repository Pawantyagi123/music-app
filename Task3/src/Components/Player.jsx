import React, { useRef, useState, useEffect } from "react";
import {
  GiNextButton,
  GiPreviousButton,
  GiPlayButton,
  GiPauseButton,
} from "react-icons/gi";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { FaRepeat, FaShuffle } from "react-icons/fa6";
import Slider from "@mui/material/Slider";

export default function Player({
  songs,
  currentSongIndex,
  setCurrentSongIndex,
}) {
  const currentSong = songs[currentSongIndex] || {};
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (isPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audioElement.duration || 0);
    };

    const handleSongEnd = () => {
      if (isRepeat) {
        audioElement.currentTime = 0;
        audioElement.play();
      } else {
        handleNextSong();
      }
    };

    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioElement.addEventListener("ended", handleSongEnd);

    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.removeEventListener("ended", handleSongEnd);
    };
  }, [currentSongIndex, isRepeat, songs]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextSong = () => {
    let nextIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * songs.length);
    } else {
      nextIndex = (currentSongIndex + 1) % songs.length;
    }
    setCurrentSongIndex(nextIndex);
    setIsPlaying(false); // Stop the current song and wait for the user to click play again
  };

  const handlePrevSong = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    setIsPlaying(false); // Stop the current song and wait for the user to click play again
  };

  const handleSeek = (e, newValue) => {
    audioRef.current.currentTime = newValue;
    setCurrentTime(newValue);
  };

  const handleVolumeChange = (e, newValue) => {
    setVolume(newValue);
    audioRef.current.volume = newValue;
    setIsMuted(newValue === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const formatTitle = (title) => {
    if (!title) return ""; // Return an empty string if title is undefined or null
    return title.length > 10 ? `${title.substring(0, 10)}...` : title;
  };
const formatArtist = (artist) => {
  if(!artist) return "";
  return artist.length > 10 ? `${artist.substring(0, 10)}...` : artist;
}  

  return (
    <div className="player">
      <h2>Now Playing</h2>
      
      <img
        src={currentSong.image}
        alt=""
        className={isPlaying ? "rotate" : "notrotate"}
      />
      
      <div className="player-text">
      <p>
        {formatTitle(currentSong.title)} <b>Song by</b> ({" "}
        <span style={{ color: "black", fontSize: "20px",fontWeight:"bold" }}>
          {formatArtist(currentSong.artist)}
        </span>{" "}
        )
      </p>
      </div>
      <audio ref={audioRef} src={currentSong.src} />
      <div
        className="progress-bar"
        style={{
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span>{formatTime(currentTime)}</span>
        <Slider
          value={currentTime}
          min={0}
          max={duration}
          onChange={handleSeek}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => formatTime(value)}
          sx={{ width: 300, color: "skyblue" }}
        />
        <span>{formatTime(duration)}</span>
      </div>
      <div
        className="player-controls"
      >
        <div className="songchangebtn">
        <button onClick={toggleShuffle} className={isShuffle ? "active" : ""}>
          <FaShuffle />
        </button>
        <div className="songchange">
        <button onClick={handlePrevSong} className="play">
          <GiPreviousButton />
        </button>
        <button
          onClick={handlePlayPause}
          className="play"
          style={{ fontSize: "40px" }}
        >
          {isPlaying ? <GiPauseButton /> : <GiPlayButton />}
        </button>
        <button onClick={handleNextSong} className="play">
          <GiNextButton />
        </button>
        </div>
        <button onClick={toggleRepeat} className={isRepeat ? "active" : ""}>
          <FaRepeat />
        </button>
      
        </div>

      <div className="volume-control">
        <button
          onClick={toggleMute}
          className="mute"
          style={{ fontSize: "1.5rem" }}
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        <Slider
          value={volume}
          min={0}
          max={1}
          step={0.01}
          onChange={handleVolumeChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
          sx={{ width: 150, color: "skyblue", height: 5 }}
        />
      </div>
      </div>
    </div>
  );
}
