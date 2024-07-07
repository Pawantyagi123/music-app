import React, { useRef, useState, useEffect } from 'react';
import { GiNextButton, GiPreviousButton, GiPlayButton, GiPauseButton } from "react-icons/gi";
import { FaVolumeUp, FaVolumeMute,FaList } from "react-icons/fa";
import { FaRepeat, FaShuffle } from 'react-icons/fa6';

export default function Player({ songs, currentSongIndex, setCurrentSongIndex }) {
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
            setDuration(audioElement.duration);
        };


        const handleSongEnd = () => {
            if (isRepeat) {
                audioElement.currentTime = 0;
                audioElement.play();
            } else {
                handleNextSong();
            }
            const nextIndex = (currentSongIndex + 1) % songs.length;
            setCurrentSongIndex(nextIndex);

        };

        audioElement.addEventListener('timeupdate', handleTimeUpdate);
        audioElement.addEventListener('ended', handleSongEnd);

        return () => {
            audioElement.removeEventListener('timeupdate', handleTimeUpdate);
            audioElement.removeEventListener('ended', handleSongEnd);
        };
    }, [currentSongIndex, setCurrentSongIndex, songs,isRepeat]);

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
        setIsPlaying(!isPlaying);
    };

    const handlePrevSong = () => {
        const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        setCurrentSongIndex(prevIndex);
        setIsPlaying(!isPlaying);
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

    const toggleShuffle = () => {
        setIsShuffle(!isShuffle);
    };

    const toggleRepeat = () => {
        setIsRepeat(!isRepeat);
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
            <p style={{width:"300px"}}>{currentSong.title} <b>Song by</b> ( <span style={{color:"skyblue",fontSize:"20px"}}>{currentSong.artist}</span> )</p>

            <audio ref={audioRef} src={currentSong.src} autoPlay/>

            <div className="player-controls">
                <button onClick={toggleShuffle} className={isShuffle ? 'active' : ''}><FaShuffle/></button>
                <button onClick={handlePrevSong}><GiPreviousButton /></button>
                <button onClick={handlePlayPause} className='play'>{isPlaying ? <GiPauseButton /> : <GiPlayButton />}</button>
                <button onClick={handleNextSong}><GiNextButton /></button>
                <button onClick={toggleRepeat} className={isRepeat ? 'active' : ''}><FaRepeat/></button>

            </div>
            <div className="progress-bar">
            <span>{formatTime(currentTime)}</span>
                <input
                    type="range"
                    value={currentTime}
                    max={duration || 0}
                    onChange={handleSeek}
                    className="seek-bar"
                />
             <span>{formatTime(duration)}</span>
                
            </div>
            <br />
           
            <div className="volume-control">
            <button onClick={toggleMute} className='mute'>{isMuted ? <FaVolumeMute /> : <FaVolumeUp />}</button>
                    <input
                        type="range"
                        value={volume}
                        min="0"
                        max="1"
                        step="0.01"
                        onChange={handleVolumeChange}
                        className="volume-bar"
                    />
                </div>
        </div>
    );
}






