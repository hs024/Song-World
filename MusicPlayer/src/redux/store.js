import {configureStore} from '@reduxjs/toolkit';
import musicReducer from './MusicSlice';
const store=configureStore({
    reducer:{
        music:musicReducer
    }
    
})
export default store;