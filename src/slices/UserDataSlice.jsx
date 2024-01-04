import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Image:"",
    cType:"",
    userdata:[],
    isLogin:false,
    query:"",
    search:false
}

const userDataSlice = createSlice({
    name:"UserData",
    initialState:initialState,
    reducers:{
        setUserImage(state,value){
           state.Image = value.payload;
        },
        setcType(state,value){
            state.cType = value.payload;
         },
        setuserdata(state,value){
            state.userdata = value.payload;
         },
         setLogin(state,value){
            state.isLogin = value.payload
         },
         setquery(state,value){
            state.query = value.payload
         },
         setsearch(state,value){
            state.search = value.payload
         }
    }
})

export const {Image,setUserImage,setcType,cType,setuserdata,userdata,setLogin,isLogin,query,setquery,search,setsearch} = userDataSlice.actions;
export default userDataSlice.reducer;


// export const {setuserdata,userdataform} = SignUpData.actions;
// export default SignUpData.reducer;
