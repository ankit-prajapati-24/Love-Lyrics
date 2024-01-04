import { createSlice } from "@reduxjs/toolkit";

const initialeState = {
    userdataform : [],
}

const SignUpData = createSlice({
    name:"User",
    initialState:initialeState,
    reducers:{
        setuserdata(state,value){
            state.userdataform = value.payload; 
        },
    },
})

export const {setuserdata,userdataform} = SignUpData.actions;
export default SignUpData.reducer;

