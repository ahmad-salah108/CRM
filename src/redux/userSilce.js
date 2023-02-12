import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser:null,
  token:null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state,action) => {
        state.currentUser=action.payload.user;
        state.token=action.payload.token;
    },
    logout:(state)=>{
        state.currentUser=null;
        state.token=null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { login ,logout} = userSlice.actions

export default userSlice.reducer