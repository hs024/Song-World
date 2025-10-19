import React from "react";
import MusicCard from "./MusicCard";
import { useSelector } from "react-redux";

function Playlist() {
  const musiclist = useSelector((state) => state.music.songs);
  const favList = useSelector((state) => state.music.fav);

  // Filter only favorite songs
  const favSongs = musiclist.filter((_, index) => favList.includes(index));

  return (
    <>
      <h1 className="Musiclisth1">Favorites</h1>
      <div id="musiclist">
        {favSongs.length > 0 ? (
          favSongs.map((song, index) => (
            <div key={index} className="musiclistcards">
              <MusicCard song={song} />
            </div>
          ))
        ) : (
          <p className="nofav">No favorites added yet.</p>
        )}
      </div>
    </>
  );
}

export default Playlist;
