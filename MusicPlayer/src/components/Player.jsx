import React from 'react'
import {useDispatch,useSelector} from "react-redux"
import { useNavigate } from 'react-router';
import { nextsong,previoussong ,addfav,remfav} from '../redux/MusicSlice';
import { useEffect } from 'react';
function Player() {
  const dispatch=useDispatch();
  const music = useSelector((state)=>state.music).songs
  const index = useSelector((state) => state.music.currentSongIndex);
  const song=music[index]
  const favList = useSelector((state) => state.music.fav);
  // const dispatch = useDispatch();

  const handleFav = () => {
    if (favList.includes(index)) {
      dispatch({ type: "music/remfav" });
    } else {
      dispatch({ type: "music/addfav" });
    }
  };
  const navigate=useNavigate()
  const handleback=()=>{
    navigate("/")
  }
  const handlenext=()=>{
    dispatch(nextsong())
  }
  const handleprev=()=>{
    dispatch(previoussong())
  }
  useEffect(() => {
    const audio = document.querySelector(".player-audio");
    const progressBar = document.getElementById("player-progress");
    const progressFill = document.getElementById("progress-fill");

    // Update progress as song plays
    const updateProgress = () => {
      if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = `${percent}%`;
      }
    };

    // Seek when user clicks bar
    const setProgress = (e) => {
      const rect = progressBar.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newTime = (offsetX / rect.width) * audio.duration;
      audio.currentTime = newTime;
    };

    // Event listeners
    audio.addEventListener("timeupdate", updateProgress);
    progressBar.addEventListener("click", setProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      progressBar.removeEventListener("click", setProgress);
    };
  }, []);
const handlePlayPause = () => {
  const audio = document.querySelector(".player-audio");
  const btn = document.getElementById("playpause");

  if (audio.paused) {
    audio.play();
    btn.classList.add("playing");
  } else {
    audio.pause();
    btn.classList.remove("playing");
  }
};

  // {console.log(song.musicLocation)}
  return (
    <>
      <header className="player-header">Now playing ~ {song.title}</header>

      <section className="player-wrapper">
        {/* Left Preview */}
        <div className="player-preview left" onClick={handleprev}>
          <img
            src={music[(index - 1 + music.length) % music.length].cover}
            alt="Prev"
            className="preview-img"
          />
        </div>

        {/* Center Player */}
        <div className="player-center">
          <div className="player-cover">
            <img src={song.cover} alt="" className="cover-img" />
          </div>

          <audio
            className="player-audio"
            src={song.musicLocation}
            autoPlay
          ></audio>

          <section className="player-progress" id="player-progress">
            <div className="progress-bar">
              <div className="progress-fill" id="progress-fill"></div>
            </div>
          </section>

          <section className="player-controls">
            <button
              className="player-button"
              id="prev"
              onClick={handleprev}
            ></button>
            <button
              className="player-button playing"
              id="playpause"
              onClick={handlePlayPause}
            ></button>
            <button
              className="player-button"
              id="next"
              onClick={handlenext}
            ></button>
            <button
              className={`player-button ${
                favList.includes(index) ? "fav-on" : ""
              }`}
              id="fav"
              onClick={handleFav}
            ></button>
          </section>

          <section className="player-caption">Singer ~ {song.writer}</section>
        </div>

        {/* Right Preview */}
        <div className="player-preview right" onClick={handlenext}>
          <img
            src={music[(index + 1) % music.length].cover}
            alt="Next"
            className="preview-img"
          />
        </div>
      </section>
    </>
  );

}

export default Player