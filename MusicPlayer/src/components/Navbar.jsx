import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
function Navbar() {
  const songs=useSelector((state)=>state.music.songs)
  const [name,setName]=useState("");
  const [results, setResults] = useState([]);
  const navigate=useNavigate()
  const handlechange=(e)=>{
    setName(e.target.value);
  }
  const handleClick = () => {
    if (name.trim() !== "") {
      // console.log(name);
      
      const filtered = songs.filter((song) =>
        song.title.toLowerCase().includes(name.toLowerCase())
      );
      setResults(filtered);
      navigate("/result", { state: { filteredSongs: filtered } });
    } else {
      setResults([]);
    }
  };
// const navigate=useNavigate()
  const handleback=()=>{
    navigate("/")
  }
  const handlefav=()=>{
    navigate("/playlist")
  }
  return (
    <>
      <ul id="navbarul">
        <li id="logo">Song world</li>
        <li id="searchnav">
          <button onClick={handleback} className="btnnav" id="home"></button>
          <button
            onClick={handlefav}
            className="btnnav"
            id="PhotoAlbum"
          ></button>
          <div id="search">
            <input
              type="text"
              placeholder="search here"
              value={name}
              onChange={handlechange}
              className="inputnav"
            />
            <button
              onClick={handleClick}
              className="btnnav"
              id="searchbtn"
            ></button>
          </div>
        </li>
      </ul>
    </>
  );
}

export default Navbar