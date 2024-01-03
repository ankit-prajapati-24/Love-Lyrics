import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
const initialState = {
    trackId:""
}

const ControlsSlice = createSlice({
    name:"NavbarSlice",
    initialState: initialState,
    reducers:{
        settrackIndex(state,value){
            state.trackIndex = value.payload
        },
        setNextIndex(state,value){
            state.trackIndex +=1;
        },
        setPrevIndex(state,value){
            state.trackIndex -=1;
        },
        settrackId(state,value){
            state.trackId = value.payload;
        }
       
    }
})
// export const {settrackId,trackId} = ControlsSlice.actions;
export default ControlsSlice.reducer;

