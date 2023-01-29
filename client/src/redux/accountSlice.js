import { createSlice } from "@reduxjs/toolkit";

const initialState = false

const accountSlice = createSlice({
    name: "Account",
    initialState,
    reducers: {
        account: (state, action) => {
            state = action.payload
            return state
        }
    },
});

export const { account } = accountSlice.actions;

export default accountSlice.reducer;
