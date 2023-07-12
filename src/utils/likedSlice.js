import { createSlice } from "@reduxjs/toolkit";

const likedSlice = createSlice({
    name:"liked",
    initialState:{
        items:[]
    },
    reducers:{
        addItem:(state,action)=>{
            state.items.push(action.payload)

        },
        removeItem:(state, action)=>{

            state.items.pop()
        },
        clearCart:(state)=>{
            console.log("FINALLLL")
            state.items = []

        }
    }
})

export const { addItem, removeItem, clearCart} = likedSlice.actions

export default likedSlice.reducer