import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
const initialState = {
    menu : true
}

const NavbarSlice = createSlice({
    name:"NavbarSlice",
    initialState: initialState,
    reducers:{
        setMenu(state,value){
            state.menu = value.payload
        }
    }
})

export const {menu,setMenu} = NavbarSlice.actions;
export default NavbarSlice.reducer;

