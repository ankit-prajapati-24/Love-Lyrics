import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    name: localStorage.getItem('name')?localStorage.getItem('name'):"",
    singer:localStorage.getItem('singer')?localStorage.getItem('singer'):"",
    img:localStorage.getItem('img')?localStorage.getItem('img'):"",
    songurl:localStorage.getItem('songurl')?localStorage.getItem('songurl'):"",
    trackId:localStorage.getItem('trackId')?localStorage.getItem('trackId'):""

}

const PlayerSlice = createSlice({
    name:"player",
    initialState:initialState,
    reducers:{
        setName(state,value){
            localStorage.setItem("name", value.payload);
            state.name = value.payload
        },
        setSinger(state,value){
            
            localStorage.setItem("singer", value.payload);
            state.singer = value.payload
        },
        setSongUrl(state,value){
            
            localStorage.setItem("songurl", value.payload);
            state.songurl = value.payload
        },
        setImg(state,value){
            localStorage.setItem("img", value.payload);
            state.img = value.payload
        },
        settrackId(state,value){
            localStorage.setItem('trackId',value.payload);
            state.trackId = value.payload;
        }
    }
})
export const { name,singer,img,songurl,setName,setSinger,setSongUrl,setImg,settrackId,trackId} = PlayerSlice.actions;
export default PlayerSlice.reducer;