import { configureStore } from "@reduxjs/toolkit";
import likedSlice from "./likedSlice";
import userSlice from "./userSlice";
import adminSlice from "./adminSlice";

const Store = configureStore({
    reducer:{
        cart:likedSlice,
        userInfo:userSlice,
        adminInfo:adminSlice

    }
    
})


export default Store