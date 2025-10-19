import React from 'react'
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import MusicCard from "./MusicCard"
function Result() {
      const navigate=useNavigate()
     const handleback = () => {
       navigate("/");
     };
     const location = useLocation();
     const filteredSongs = location.state?.filteredSongs || [];
     const musiclist=filteredSongs;
    //  console.log(musiclist);
     
  return (
    <>
      <h1 className='Musiclisth1'>Welcome to Search List</h1>
      {/* <section>
        {" "}
        <button onClick={handleback}>Back to homepage</button>
      </section> */}
      <div id="musiclist">
        {musiclist.map((song, index) => {
          return (
            <div key={index} className="musiclistcards">
              {/* {console.log(song)} */}
              <MusicCard song={song}></MusicCard>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Result