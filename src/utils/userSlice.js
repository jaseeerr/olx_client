import { createSlice } from "@reduxjs/toolkit";


let data = localStorage.getItem('user')


let status
if(data)
{
    status = true
}
else
{
    status = false
}
console.log(data)
const userSlice = createSlice({
    name:"userInfo",
    initialState:{
        items:[],
        liked:[],
        name:"",
        login:status,
        userdata:{}

    },
    reducers:{
        
       
        loginStatus:(state,action)=>{
            state.login = action.payload
        },
        updateUserdata:(state,action)=>{
            state.userdata = action.payload
        },
        
    }
})

export const { addItem, removeItem, clearCart, loginStatus,updateUserdata} = userSlice.actions

export default userSlice.reducer