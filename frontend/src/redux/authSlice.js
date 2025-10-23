import { createSlice } from '@reduxjs/toolkit'

const initialState= {
  isLoggedIn :false,
  userData: null
}

 const authSlice= createSlice({
    name: 'auth',
    initialState,
    reducers :{ // reducers are func's that manages states
        login : (state,action)=>{
            state.isLoggedIn=true
            state.userData=action.payload.userData

        },
        logout : (state)=>{
           state.isLoggedIn=false
            state.userData=null

        },

    }
})

export const {login,logout} = authSlice.actions

export default authSlice.reducer