import React, { useRef, useState, useEffect } from 'react';
import { GiNextButton, GiPreviousButton, GiPlayButton, GiPauseButton } from "react-icons/gi";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export default function Player({ songs, currentSongIndex, setCurrentSongIndex }) {
    const currentSong = songs[currentSongIndex] || {}; 
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

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
            setDuration(audioElement.duration);
        };

        audioElement.addEventListener('timeupdate', handleTimeUpdate);

        const handleSongEnd = () => {
            const nextIndex = (currentSongIndex + 1) % songs.length;
            setCurrentSongIndex(nextIndex);
        };

        audioElement.addEventListener('ended', handleSongEnd);

        return () => {
            audioElement.removeEventListener('timeupdate', handleTimeUpdate);
            audioElement.removeEventListener('ended', handleSongEnd);
        };
    }, [currentSongIndex, setCurrentSongIndex, songs]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleNextSong = () => {
        const nextIndex = (currentSongIndex + 1) % songs.length;
        setCurrentSongIndex(nextIndex);
    };

    const handlePrevSong = () => {
        const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        setCurrentSongIndex(prevIndex);
    };

    const handleSeek = (e) => {
        const seekTime = parseFloat(e.target.value);
        audioRef.current.currentTime = seekTime;
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        audioRef.current.muted = !isMuted;
    };
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    

    return (
        <div className="player">
            <h2>Now Playing</h2>
            <img src={currentSong.image} alt="" className={isPlaying ? "rotate" : "notrotate"}/>
            <p>{currentSong.title} by <span style={{color:"skyblue"}}>{currentSong.artist}</span></p>
            <audio ref={audioRef} src={currentSong.src} />
            <div className="player-controls">
                <button onClick={handlePrevSong}><GiPreviousButton /></button>
                <button onClick={handlePlayPause}>{isPlaying ? <GiPauseButton /> : <GiPlayButton />}</button>
                <button onClick={handleNextSong}><GiNextButton /></button>
            </div>
            <div className="progress-bar">
            <span>{formatTime(currentTime)}</span>&nbsp;&nbsp;
                <input
                    type="range"
                    value={currentTime}
                    max={duration || 0}
                    onChange={handleSeek}
                    className="seek-bar"
                />&nbsp;&nbsp;
             <span>{formatTime(duration)}</span>
                   
                
            </div>
            <br />
           
            {/* <div className="volume-control">
                    <input
                        type="range"
                        value={volume}
                        min="0"
                        max="1"
                        step="0.01"
                        onChange={handleVolumeChange}
                        className="volume-bar"
                    />
                    <button onClick={toggleMute} className='mute'>{isMuted ? <FaVolumeMute /> : <FaVolumeUp />}</button>
                </div> */}
        </div>
    );
}



