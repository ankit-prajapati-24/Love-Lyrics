import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    Albumname:localStorage.getItem("Albumname")?localStorage.getItem("Albumname"):"",
    Albumimg:localStorage.getItem("Albumimg")?localStorage.getItem("Albumimg"):"",
    Songs:[],
    trackIndex : 0
}

const AlbumSlice = createSlice({
    name:"player",
    initialState:initialState,
    reducers:{
        setAlbumName(state,value){
            localStorage.setItem("Albumname",value.payload);
            state.Albumname = value.payload
        },
        setAlbumimg(state,value){
            
            localStorage.setItem("Albumimg",value.payload);
            state.Albumimg = value.payload
        },
        setSongs(state,value){
            localStorage.setItem("Songs",value.payload);
            state.Songs = value.payload
        },
        settrackIndex(state,value){
            state.trackIndex =  value.payload
        },
        setNextIndex(state,value){
            if(state.trackIndex+1 < state.Songs.length){
                state.trackIndex = state.trackIndex +   value.payload
            }
        },
        setPrevIndex(state,value){
            if(state.trackIndex-1 > 0){
                state.trackIndex = state.trackIndex -  value.payload
              }
        }
       
    }
})
export const { Albumname,setAlbumName,setSongs,setAlbumimg,Albumimg,Songs,setPrevIndex,setNextIndex,settrackIndex,trackIndex} = AlbumSlice.actions;
export default AlbumSlice.reducer;