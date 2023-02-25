import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const chatSlice = createSlice({
    name: "chatWith",
    initialState,
    reducers: {
        chatWith: (state, action) => {
            state = action.payload
            return state
        }
    },
});

export const { chatWith } = chatSlice.actions;

export default chatSlice.reducer;
