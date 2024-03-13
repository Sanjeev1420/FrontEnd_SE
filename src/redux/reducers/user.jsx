import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'user_state',
    initialState : {
        userData : {},
        token : null,
    } ,

    reducers : {
        setUser : (state,action) => {
          state.userData = action.payload.user
        },

        setToken : (state,action) => {
           state.token = action.payload.token
        },

        updateUser : (state,action) => {
           state.userData = {
              ...state.userData ,
              ...action.payload
           };
        }
        
    }
});

export const {setUser , setToken , updateUser } = userSlice.actions;
export default userSlice.reducer;