import {BrowserRouter as Router ,Route ,Routes} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Player from './components/Player' 
import MusicList from './components/MusicList' 
import Footer from './components/Footer'
import Result from './components/Result'
import Playlist from './components/Playlist'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSongs } from "./redux/MusicSlice";
function App() {
   const dispatch = useDispatch();

   useEffect(() => {
     dispatch(fetchSongs()); // fetch all songs by default
   }, [dispatch]);

  return (
    <div class="body">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<MusicList />} />
          <Route path='/player' element={<Player />} />
          <Route path='/result' element={<Result />} />
          <Route path='/playlist' element={<Playlist />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
