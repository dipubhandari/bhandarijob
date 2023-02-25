import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const chatSlice = createSlice({
    name: "currentchat",
    initialState,
    reducers: {
        currentchat: (state, action) => {
           
        }
    },
});

export const { currentchat } = chatSlice.actions;

export default chatSlice.reducer;
