import React from 'react'
import {useDispatch,useSelector} from "react-redux"
import { useNavigate } from 'react-router'
import {setcurrentsong} from '../redux/MusicSlice'
function MusicCard({song}) {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleplay=()=>{
      dispatch(setcurrentsong(song.id-1))
      
      // alert("hi check it ")
      
      navigate("/player")
  }
  return (
    <div className="musiccard">
      {/* {console.log(song)} */}

      <div className="cover-wrapper">
        <div className="flip-card-inner">
          <img src={song.cover} alt="" className="cover" />
          <div className="cover-back">{song.writer}</div>
        </div>
      </div>

      <header>{song.title}</header>
      <section className="caption">Singer ~ {song.writer}</section>
      <button className="playbutton" onClick={handleplay}></button>
    </div>
  );
}

export default MusicCard