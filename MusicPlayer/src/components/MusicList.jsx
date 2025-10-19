import React from 'react'
import MusicCard from './MusicCard'
import {useDispatch,useSelector} from 'react-redux'
function MusicList() {
  const dispatch=useDispatch();
  const musiclist=useSelector((state)=>state.music).songs
  return (
    <>
    <h1 class="Musiclisth1">Welcome to Song World</h1>
    <div id="musiclist">
    {
      musiclist.map((song,index)=>{
        return <div key={index} className="musiclistcards">
          {/* {console.log(song)} */}
            <MusicCard song={song}></MusicCard>
        </div>
      })
    }
      
    </div>
    
    
    
    </>
  )
}

export default MusicList