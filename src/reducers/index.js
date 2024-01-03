import { combineReducers } from "@reduxjs/toolkit";
import  UserReducer from "../slices/SignUpData";
import player from "../slices/player";
import album from "../slices/album";
import navbarSlice from '../slices/Navbar'
import UserDataSlice from "../slices/UserDataSlice";
import ControlsSlice from "../slices/Control";
const rootReducer = combineReducers({
    User:UserReducer,
    Player:player,
    Album:album,
    Navbar:navbarSlice,
    User:UserDataSlice,
    Controls:ControlsSlice
});

export default  rootReducer