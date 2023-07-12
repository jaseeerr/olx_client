import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config/URLS";


let data = localStorage.getItem('admin')





let status
if(data)
{
    status = true
}
else
{
    status = false
}
const adminSlice = createSlice({
    name:"adminInfo",
    initialState:{
       
        login:status,
        userlist:[]
        

    },
    reducers:{
        
        loginStatus:(state,action)=>{
            state.login = action.payload
        },
        updateUserList:(state,action)=>{

            state.userlist = action.payload
        
        }
       
    }
})

export const {loginStatus,updateUserList} = adminSlice.actions

export default adminSlice.reducer