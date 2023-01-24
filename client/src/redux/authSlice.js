import { createSlice } from "@reduxjs/toolkit";

const initialState = 0

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        isLogin: (state, action) => {
            state = action.payload           
            return state
        }
    },
});

export const { isLogin } = authSlice.actions;

export default authSlice.reducer;
