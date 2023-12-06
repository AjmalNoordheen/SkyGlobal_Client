import { createSlice } from '@reduxjs/toolkit'

export const baseAuth = createSlice({
  name: 'user',
  initialState: {
    token:null,
    userName:null,
    id:null
  },
  reducers: {
    Login:(state,action)=>{
        state.token = action.payload.token
       

    },
    userName:(state,action)=>{
        state.userName = action.payload.userName
    },
    userId:(state,action)=>{
        state.id = action.payload.id
    },
    Logout:(state)=>{
        state.token = ''
        state.userName = ''
    }
   
  }
})

export const { Login,userName,userId,Logout } = baseAuth.actions

export const userReducer =  baseAuth.reducer