import { createSlice } from "@reduxjs/toolkit";

const initialState = false

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        isLogin: (state, action) => {
            console.log(action.payload)
            state = action.payload           
            return state
        }
    },
});

export const { isLogin } = authSlice.actions;

export default authSlice.reducer;
