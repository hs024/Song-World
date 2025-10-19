import { createSlice } from "@reduxjs/toolkit";
import musicdata from "../assets/musicdata.json"
import {  createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSongs = createAsyncThunk("music/fetchSongs", async () => {
  const res = await fetch("http://127.0.0.1:8000/api/songs/");
  const data = await res.json();
  return data;
});
const initialState = {
  name: "music",
  songs: musicdata,
  fav: localStorage.getItem("fav")
    ? JSON.parse(localStorage.getItem("fav"))
    : [],
  // songs:[],
  currentSongIndex: localStorage.getItem("currentSongIndex")
    ? Number(localStorage.getItem("currentSongIndex"))
    : null,
  isPlaying: false,
  repeat: false,
  shuffle: false,
};
const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setcurrentsong: (state, action) => {
      state.currentSongIndex = action.payload;
      localStorage.setItem("currentSongIndex", action.payload);
    },
    nextsong: (state) => {
      if (state.currentSongIndex === null) {
        state.currentSongIndex = 0;
      } else {
        state.currentSongIndex =
          state.currentSongIndex + 1 >= state.songs.length
            ? 0
            : state.currentSongIndex + 1;
      }
      localStorage.setItem("currentSongIndex", state.currentSongIndex);
    },
    previoussong: (state) => {
      if (state.currentSongIndex === null) {
        state.currentSongIndex = 0;
      } else {
        state.currentSongIndex =
          state.currentSongIndex - 1 < 0
            ? state.songs.length - 1
            : state.currentSongIndex - 1;
      }
      localStorage.setItem("currentSongIndex", state.currentSongIndex);
    },
    addfav: (state) => {
      const favs = JSON.parse(localStorage.getItem("fav")) || [];
      if (!favs.includes(state.currentSongIndex)) {
        favs.push(state.currentSongIndex);
        localStorage.setItem("fav", JSON.stringify(favs));
      }
      state.fav = favs;
    },
    remfav: (state) => {
      const favs = JSON.parse(localStorage.getItem("fav")) || [];
      const updated = favs.filter((i) => i !== state.currentSongIndex);
      localStorage.setItem("fav", JSON.stringify(updated));
      state.fav = updated;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.songs = action.payload;
      })
      .addCase(fetchSongs.rejected, (state) => {
        state.status = "failed";
      });
  },
});
export const { setcurrentsong,nextsong,previoussong,addfav,remfav } = musicSlice.actions;
export default musicSlice.reducer;